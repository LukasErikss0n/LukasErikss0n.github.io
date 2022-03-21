const apiKey = "api_key=1a08c634ec1bc9d64558c15c3e88cdbf";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const backdropUrl = "https://image.tmdb.org/t/p/original";

const popularApiMovies =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey; //Hämtar Api för det olika kategorierna för att använda datan
const bestDramaApiMovies =
  baseUrl +
  "/discover/movie?with_genres=18&primary_release_year=2014&" +
  apiKey;
const willFerriBestMovie =
  baseUrl +
  "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&" +
  apiKey;

const seconPopular = document.getElementById("main-movie");
const sectionDrama = document.getElementById("drama-movie");
const sectionBestmovies = document.getElementById("best2010-movie");
const movieCardSpecification = document.getElementById("specification-card");
const searchContainer = document.getElementById("search-container");
const searchUrl = baseUrl + "/search/movie?query=";

const formSearch = document.getElementById("form-search");
const search = document.getElementById("search");

const popularGenre = document.getElementById("popular-genre");

function getApiMovies(url, container) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results); //ta bort sen
      showMovies(data.results, container);
    });
}

const popularContainer = document.getElementById("main-movie"); //skickar in vart en viss api ska hamna
getApiMovies(popularApiMovies, popularContainer);

const dramaContainer = document.getElementById("drama-movie");
getApiMovies(bestDramaApiMovies, dramaContainer);

const willFerriBestMovieContainer = document.getElementById("best2010-movie");
getApiMovies(willFerriBestMovie, willFerriBestMovieContainer);

function showMovies(movies, container) {
  movies.forEach(function (movie) {
    const {
      title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      adult,
    } = movie; //kallar på datan som jag vill använda från arrayn
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `
       
        <img class="movie-image" src="${imgUrl + poster_path}"alt="${title}"/>
        <div class="movie-information">
            <div class = "movie-information-card">
            <div class ="close-info">
             <p class ="close-info-p">X</p>
            </div>
            <img class = "movie-backdrop" src="${
              backdropUrl + backdrop_path
            }" alt="${title}">
            <div class ="tittle-and-button">
                <h2 class="tittle">${title}<h2>
                <a class ="button-play"><i class="fas fa-play-circle"></i>Play</a>
            </div>
            <div class ="movie-overview-info">
                <p class ="relase-date"><span class = ${getRatingColor(
                  vote_average
                )}>${vote_average} Vote avrage</span>Relase date: ${release_date}<span class="age-limit">${whoCanWatch(
      adult
    )}</span></p>
                <p class ="overview">${overview}</p>
               
            </div>
            </div>
        </div>
         `;

    container.appendChild(movieEl); //här lägs html kod till ^ i en specifik kontainer(beror på vad jag skickar in i getApimovies andra parameter)
  });
}

function getRatingColor(vote) {
  if (vote >= 8) {
    return "review-green";
  } else if (vote >= 5) {
    return "review-orange";
  } else {
    return "review-red";
  }
}

function whoCanWatch(adult) {
  if (adult === true) {
    return "18+";
  } else {
    return "3+";
  }
}


search.onkeydown = function(event){
    searchContainer.innerHTML = "";
    if (event.key === "Enter"){
        event.preventDefault()
        let searchTerm = search.value
        const searchResult = searchUrl + searchTerm + "&" + apiKey;
        getApiMovies(searchResult, searchContainer);
    } 
}


document.body.onclick = function (event) {
  //här kommer ett movie-card fram när man klickar på bilderna i sidan för att få upp mer info om just den filmen
  if (event.target.classList.contains("movie-image")) {

    event.target.parentElement.children[1].style.display = "inline";
    event.target.parentElement.children[1].style.position = "fixed";
    document.body.style.overflowY = "hidden";
  } else if (event.target.classList.contains("close-info-p")) {

    event.target.parentElement.parentElement.parentElement.style.display =
      "none";
    event.target.parentElement[2].style.position = "inherit";
    document.body.style.overflowY = "scroll";
  }
};
