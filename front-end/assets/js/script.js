// Testes de identificação de elementos para inserção de dados

// for (item of document.querySelectorAll(".video-item")){
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log(item.childNodes[1].src);
//     console.log("------------");
// }


async function loadMovieAndTvContentFromAPI(){

    document.querySelector("#loading").style.display = "block";
    document.querySelector("#backdrop-content").style.display = "block";

    const response = await fetch("http://127.0.0.1:8000/getMoviesAndTvContent/");
    const responseObj = await response.json();

    document.querySelector("#loading").style.display = "none";
    document.querySelector("#backdrop-content").style.display = "none";
    // Código para carregar o content dos .movies ou .tv no console
    console.log("Filmes:")
    responseObj.movies.forEach(movie => {
        console.log("Título do Filme:", movie.title);
        console.log("URL da Imagem:", movie.imgURL);
        console.log("Avaliação: ", movie.rate);
        console.log("------------------------------");
    })

    console.log("==================================");

    console.log("Séries:")
    responseObj.tvShows.forEach(show => {
        console.log("Título da Série:", show.title);
        console.log("URL da Imagem:", show.imgURL);
        console.log("Avaliação: ", show.rate);
        console.log("------------------------------");
    })

    return responseObj;

}


async function sendContentToIndex(){
    const dados = await loadMovieAndTvContentFromAPI();

    dados.movies.forEach(movie => {

        const divSlide = document.createElement("div");
        divSlide.classList.add("slide");

        const imgSlide = document.createElement("img");
        imgSlide.classList.add("img-slide");
        imgSlide.alt = `Imagem do filme ${movie.title}`;
        imgSlide.src = movie.imgURL;

        const rateText = document.createElement("p");
        rateText.classList.add("slide-rate");
        if(!(movie.rate === null))
            rateText.innerHTML = `<i class="bi bi-star-fill"></i><span>${movie.rate}</span><span class="star-span"><i class="bi bi-star"></i></span>`;
        else
            rateText.innerHTML = `<i class="bi bi-star-fill"></i><span>Sem Avaliação</span><span class="star-span"><i class="bi bi-star"></i></span>`;


        const movieTitle = document.createElement("h1");
        movieTitle.classList.add("slide-movie-title");
        movieTitle.textContent = movie.title;

        const btnPlus = document.createElement("button");
        btnPlus.classList.add("slide-btn-list");
        btnPlus.innerHTML = '<i class="bi bi-plus"></i>Lista';


        const btnTrailer = document.createElement("button");
        btnTrailer.classList.add("slide-btn-trailer");

        btnTrailer.innerHTML = '<i class="bi bi-caret-right-fill"></i>Trailer';

        divSlide.appendChild(imgSlide);
        divSlide.appendChild(rateText);
        divSlide.appendChild(movieTitle);
        divSlide.appendChild(btnPlus);
        divSlide.appendChild(btnTrailer);

        document.querySelector(".slider").appendChild(divSlide);
    })
}

async function sendContentToIndex2(){
    const dados = await loadMovieAndTvContentFromAPI();

    dados.movies.forEach(movie => {

        const divSlide = document.createElement("div");
        divSlide.classList.add("slide-fans-favorite");

        const imgSlide = document.createElement("img");
        imgSlide.classList.add("slide-img-fans-favorite");
        imgSlide.alt = `Imagem do filme ${movie.title}`;
        imgSlide.src = movie.imgURL;

        const rateText = document.createElement("p");

        rateText.classList.add("slide-rate-fans-favorite");
        if(!(movie.rate === null))
            rateText.innerHTML = `<i class="bi bi-star-fill"></i><span>${movie.rate}</span><span class="star-span"><i class="bi bi-star"></i></span>`;
        else
            rateText.innerHTML = `<i class="bi bi-star-fill"></i><span>Sem Avaliação</span><span class="star-span"><i class="bi bi-star"></i></span>`;

        const movieTitle = document.createElement("h1");
        movieTitle.classList.add("slide-movie-title-fans-favorite");
        movieTitle.textContent = movie.title;


        const btnPlus = document.createElement("button");
        btnPlus.classList.add("slide-btn-list-fans-favorite");
        btnPlus.innerHTML = '<i class="bi bi-plus"></i>Lista';


        const btnTrailer = document.createElement("button");
        btnTrailer.classList.add("slide-btn-trailer-fans-favorite");

        btnTrailer.innerHTML = '<i class="bi bi-caret-right-fill"></i>Trailer';

        divSlide.appendChild(imgSlide);
        divSlide.appendChild(rateText);
        divSlide.appendChild(movieTitle);
        divSlide.appendChild(btnPlus);
        divSlide.appendChild(btnTrailer);

        document.querySelector(".slider-fans-favorite").appendChild(divSlide);
    })
}


document.addEventListener("DOMContentLoaded", sendContentToIndex);
document.addEventListener("DOMContentLoaded", sendContentToIndex2);


function scrollSlider(value) {
    document.querySelector(".slider").scrollTo({
        left:document.querySelector(".slider").scrollLeft + value,
        behavior:"smooth"
    });
}
function scrollSlider1(value) {
    document.querySelector(".slider-fans-favorite").scrollTo({
        left: document.querySelector(".slider-fans-favorite").scrollLeft + value,
        behavior: "smooth"
    });
}
function scrollSlider2(value) {
    document.querySelector(".slider-borned").scrollTo({
        left: document.querySelector(".slider-borned").scrollLeft + value,
        behavior: "smooth"
    });
}// .then(data => {
//     console.log(data)
// })
// .catch(error =>{
//     console.error(error);
// })
