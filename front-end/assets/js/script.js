// Testes de identificação de elementos para inserção de dados

// for (item of document.querySelectorAll(".video-item")){
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log("------------");
// }


async function loadMovieAndTvContentFromAPI(){
    const response = await fetch("http://127.0.0.1:8000/");

    const responseObj = await response.json();
    
    console.log(responseObj);

    // Código para carregar o content dos .movies ou .tv no console

    // Object.values(responseObj.data.movies.edges).forEach((movie) => {
    //     console.log(movie.node.titleText.text);
    // })
}

loadMovieAndTvContentFromAPI();