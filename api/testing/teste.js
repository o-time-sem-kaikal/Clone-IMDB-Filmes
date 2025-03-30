fetch("http://127.0.0.1:8000/getInfo/1")
.then(response => response.json()) //transforma em Object
.then(obj => { // aqui está o resultado da promessa
    document.querySelector(".content").textContent= `Id: ${obj.id} | Name: ${obj.name} | E-mail: ${obj.email}`;
})
