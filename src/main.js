const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

function loadImage(container, iterator) {
    container.innerHTML = '';
   iterator.forEach(iterator => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
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
    
    categoriesPreviewList.innerHTML = '';
      genres.forEach(genres => {
        const categoriesPreviewGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category-container');
        const categoriesTitle =  document.createElement('h3');
        categoriesTitle.classList.add('category-title');
        categoriesTitle.setAttribute('id', `id${genres.id}`);
        /* id de h3 */
        categoriesTitle.addEventListener('click', () => {
            location.hash = `#category=${genres.id}=${genres.name}`;
          });
        const categoriesTitleText = document.createTextNode(genres.name)
        categoriesPreviewGenresContainer.appendChild(categoriesContainer);
        categoriesContainer.appendChild(categoriesTitle);
        categoriesTitle.appendChild(categoriesTitleText);
    });
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

getTrendingMoviesPreview();
getCategoriesPreview();