const global = {
  currentPage: window.location.pathname,
};

// Fetching function to get data from the API
async function fetchAPIdata(endpoint) {
  const API_KEY = '8e910b8001b97796872ce25e3010e43b';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// Display popular movies on the home page
async function displayPopularMovies() {
  const { results } = await fetchAPIdata('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');

    const moviePoster = movie.poster_path
      ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />`
      : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`;

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${moviePoster}
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Highlight the active link in the nav bar
function highLightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Routing
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Welcome to the home page!');
      displayPopularMovies();
      break;

    case '/shows.html':
      console.log('Welcome to the shows page!');
      break;

    case '/movie-details.html':
      console.log('Welcome to the movie details page!');
      break;

    case '/tv-details.html':
      console.log('Welcome to the TV details page!');
      break;

    case '/search.html':
      console.log('Welcome to the search page!');
      break;
    default:
      break;
  }
  highLightActiveLink();
}

window.addEventListener('DOMContentLoaded', init);
