/* const navigationHistory = []; */

searchFormBtn.addEventListener("click", () => {
  location.hash = `#search=${searchFormInput.value}`;
  /* const [_, query] = location.hash.split('=');
  navigationHistory.push(query); */
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  /* if(navigationHistory.length >= 2){
    function resolve () {
      navigationHistory.pop();
      //ultimo elemento del array
      const ultimateElement = navigationHistory[navigationHistory.length - 1];
      return ultimateElement;
    }
    backHistory(resolve())
  } else {
    location.hash = '#home';
  } */
  history.back();
});
/*  document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    skeletorHome()
  }
  else if (event.target.readyState === 'complete') {
    homePage()
  }
}); */  //quitar la clase loading

/* window.addEventListener("DOMContentLoaded", navigator, false); */

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  //para evitar que se escrolee automaticamente hacia abajo
  window.scrollTo(/*x*/ 0, /*y*/ 0);
}
/* function skeletorHome() {
  console.log("skeletorHome!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");

  headerTitle.innerHTML = "";
  
  headerTitle.classList.add("loading");

  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");
  searchFormInput.setAttribute("placeholder", "");
  searchFormInput.style.borderRadius = "10px";
  searchFormInput.classList.add("loading");
  searchFormBtn.classList.add("inactive");

  trendingPreviewTitle.textContent = "";
  
  trendingPreviewTitle.classList.add("loading");

  trendingBtn.classList.add("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  categoryPreviewTitle.textContent = "";
  
  categoryPreviewTitle.classList.add("loading");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
 
  

  loadCuadroSkeletor(trendingMoviesPreviewList);
  categorySkeletor(categoriesPreviewList);
} */

function homePage() {
  console.log("Home!!");
  headerTitle.classList.remove("loading");
  headerTitle.innerHTML = 'George Movies';
  searchFormInput.classList.remove("loading");
  searchFormBtn.classList.remove("inactive");
  trendingPreviewTitle.classList.remove("loading");
  trendingPreviewTitle.innerHTML = 'Tendencias';
  categoryPreviewTitle.classList.remove("loading");
  categoryPreviewTitle.innerHTML = 'Categorys';
  htmlClass.classList.remove("loading");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  footer.classList.remove("inactive");
  htmlClass.classList.add("remove");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log("categories!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  const [_, urlId, urlName] = location.hash.split("=");
  //esto es para evitar que se escriba en el dom '%' y generar los espacios correspondientes entre palabras
  const urlNameModific = urlName.replace("%20", " ");

  headerCategoryTitle.innerHTML = urlNameModific;

  getMoviesByCategory(urlId);
}

function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
  getMoviesSimilar(movieId);
}

/* function backHistory(query) {
  console.log('back!!');
  console.log(query)
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  getMoviesBySearch(query);
} */

function searchPage() {
  console.log("Search!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
}

function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();
}
