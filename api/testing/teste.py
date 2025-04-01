# # Teste para aprendizado da biblioteca
# @app.get("/getInfo/{id}")
# async def getInfoTeste(id:int):
#     async with httpx.AsyncClient() as client:
#         response = await client.get(f"https://jsonplaceholder.typicode.com/users/{id}")
#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail="Imagem não encontrada")
#         return response.json() #aqui eu vou tá recebendo no javascript como bytes senão usar o json.loads()

# # Teste para pydantic

# class Item(BaseModel):
#     text: str #deixa o text required
#     price: float

t = {"filmes": [
    {"id": 1, "title": {"teste": "ola"}},
    {"id": 2, "title": "tipo isso isso"}
]}

print(dict(t["filmes"][0].get("title"))["teste"])