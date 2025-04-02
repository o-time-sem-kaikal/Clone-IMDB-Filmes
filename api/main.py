from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import httpx
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Any
import json

class MovieOrTvShowUnit(BaseModel):
    title: Optional[str]
    imgURL: Optional[str]
    rate: Optional[float]

class MoviesTvShowResponse(BaseModel):
    movies: list[MovieOrTvShowUnit]
    tvShows: list[MovieOrTvShowUnit]

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def getData():
    return {"success": "API CARREGADA"}


@app.get("/getMoviesAndTvContent/")
async def getMoviesAndTvContent(first: int = 30) -> MoviesTvShowResponse:
    async with httpx.AsyncClient() as clientAsync:
        response = await clientAsync.get(
            f"https://imdb8.p.rapidapi.com/title/v2/get-popular?first={first}&country=US&language=en-US", headers={
                'x-rapidapi-key': '49ebdfd584msh130c134b91ffe06p1e9d60jsn03b967d686f4',
		        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            })



        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Erro na requisição da api IMDB para filmes e séries!")

        movies = [MovieOrTvShowUnit(title=filme.get("node").get("titleText", {}).get("text", "Titulo Desconhecido"), imgURL=filme.get("node").get("primaryImage", {}).get("url", "URL desconhecida"), rate= filme.get("node", {}).get("ratingsSummary", {}).get("aggregateRating", "Sem nota")) for filme in response.json()["data"]["movies"]["edges"]]
        tvShows = [MovieOrTvShowUnit(title=filme.get("node").get("titleText", {}).get("text", "Titulo Desconhecido"), imgURL=filme.get("node").get("primaryImage", {}).get("url", "URL desconhecida"), rate= filme.get("node", {}).get("ratingsSummary", {}).get("aggregateRating", "Sem nota")) for filme in response.json()["data"]["tv"]["edges"]]

        return MoviesTvShowResponse(movies=movies, tvShows=tvShows)



@app.get("")
async def getActors(first: int = 30):
    async with httpx.AsyncClient() as clientAsync:
        response = await clientAsync.get(
            f"urlACTORS", headers={
                "x-rapidapi-key": "46c9b8bf22msh06c5ae5c58a4ad1p1d48edjsnb27791c7bbb3",
                "x-rapidapi-host": "imdb8.p.rapidapi.com"
            })
        
        if response.status_code != 200:
            return HTTPException(response.status_code, detail="Erro na requisição da api IMDB para atores!")

        return response.json()


# ainda está rodando local para testes
if __name__ == "__main__":
    uvicorn.run(app, port=8000)