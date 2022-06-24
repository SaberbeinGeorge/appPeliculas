async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + APY_KEY);
    const data = await res.json();

    const movies = data.results;
    console.log(movies)
    
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg =  document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 
        `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
};

async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + APY_KEY + '&language=es-Mx');
    const data = await res.json();

    const genres = data.genres;
    console.log(genres)
    
      genres.forEach(genres => {
        const categoriesPreviewGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category-container');
        const categoriesTitle =  document.createElement('h3');
        categoriesTitle.classList.add('category-title');
        categoriesTitle.setAttribute('id', `id${genres.id}`);
        /* id de h3 */
        const categoriesTitleText = document.createTextNode(genres.name)
        categoriesPreviewGenresContainer.appendChild(categoriesContainer);
        categoriesContainer.appendChild(categoriesTitle);
        categoriesTitle.appendChild(categoriesTitleText);
    });
};

getTrendingMoviesPreview();
getCategoriesPreview();