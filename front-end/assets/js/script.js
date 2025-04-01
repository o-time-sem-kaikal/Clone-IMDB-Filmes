// Testes de identificação de elementos para inserção de dados

// for (item of document.querySelectorAll(".video-item")){
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log("------------");
// }


async function loadMovieAndTvContentFromAPI(){
    const response = await fetch("http://127.0.0.1:8000/getMoviesAndTvContent/");

    const responseObj = await response.json();

    // Código para carregar o content dos .movies ou .tv no console

    responseObj.movies.forEach(movie => {
        console.log("Título do Filme:", movie.title);
        console.log("URL da Imagem:", movie.imgURL);
        console.log("Avaliação: ", movie.rate);
        console.log("")
    })
}

loadMovieAndTvContentFromAPI();