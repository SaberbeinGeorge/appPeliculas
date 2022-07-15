const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});
function loadCategory(container, category) {
    container.innerHTML = '';
    category.forEach(category => {
      const categoriesContainer = document.createElement('div');
      categoriesContainer.classList.add('category-container');
      const categoriesTitle =  document.createElement('h3');
      categoriesTitle.classList.add('category-title');
      categoriesTitle.setAttribute('id', `id${category.id}`);
      /* id de h3 */
      categoriesTitle.addEventListener('click', () => {
          location.hash = `#category=${category.id}=${category.name}`;
        });
      const categoriesTitleText = document.createTextNode(category.name)
      container.appendChild(categoriesContainer);
      categoriesContainer.appendChild(categoriesTitle);
      categoriesTitle.appendChild(categoriesTitleText);
  });
}

function loadImage(container, iterator) {
    container.innerHTML = '';
   iterator.forEach(iterator => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${iterator.id}`;
        });
        const movieImg =  document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',iterator.title);
        movieImg.setAttribute('src', 
        `https://image.tmdb.org/t/p/w300${iterator.poster_path}`);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;
    console.log(movies)
    
    loadImage(trendingMoviesPreviewList, movies);   
};

async function getCategoriesPreview() {
    const { data } = await api(`/genre/movie/list`);

    const genres = data.genres;
    console.log(genres)
    
    loadCategory(categoriesPreviewList, genres);

};

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params : {
            with_genres : id,
        },
    });

    const movies = data.results;
    console.log(movies)
    
    loadImage(genericSection, movies);
};

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params : {
            query,
        },
    });

    const movies = data.results;
    console.log(movies)
    
    loadImage(genericSection, movies);
};

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;

    loadImage(genericSection, movies);
}

async function getMovieById(id) {
    const { data : movie } = await api(`movie/${id}`);
    headerSection.classList.add('.header-container--long');
    const urlImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background = `
    ${linerGradient}, ${urlImage})`;
    movieDetailTitle.innerHTML = movie.title;
    movieDetailDescription.innerHTML = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    loadCategory(movieDetailCategoriesList, movie.genres);
    window.scrollTo(/*x*/0, /*y*/0);
}

async function getMoviesSimilar(movie_id) {
    const { data : movie } = await api(`movie/${movie_id}/similar`);
    headerSection.classList.add('.header-container--long');
    loadImage(relatedMoviesContainer, movie.results);
}
getTrendingMoviesPreview();
getCategoriesPreview();