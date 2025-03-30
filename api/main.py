from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import httpx
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    text: str #deixa o text required
    price: float

class MovieContent(BaseModel):
    title: str
    imgURL: str
    rate: float

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/getMoviesAndTvContent/")
async def getMoviesAndTvContent(first: int = 30):
    async with httpx.AsyncClient() as clientAsync:
        response = await clientAsync.get(
            f"https://imdb8.p.rapidapi.com/title/v2/get-popular?first={first}&country=US&language=en-US", headers={
                "x-rapidapi-key": "46c9b8bf22msh06c5ae5c58a4ad1p1d48edjsnb27791c7bbb3",
                "x-rapidapi-host": "imdb8.p.rapidapi.com"
            })
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Erro na requisição da api IMDB")

        return response.json()



@app.get("/")
def getData():
    return {"success": "API CARREGADA"}


@app.get("/getInfo/{id}")
async def getInfoTeste(id:int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://jsonplaceholder.typicode.com/users/{id}")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Imagem não encontrada")
        return response.json() #aqui eu vou tá recebendo no javascript como bytes senão usar o json.loads()

# ainda está rodando local para testes
if __name__ == "__main__":
    uvicorn.run(app, port=8000)