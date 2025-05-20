const global = {
  currentPage: window.location.pathname,
};

// Fetching function to get data from the API
async function fetchAPIdata(endpoint) {
  const API_KEY = '8e910b8001b97796872ce25e3010e43b';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner(); // Show spinner before fetching data

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  console.log(data);

  hideSpinner(); // Hide spinner after fetching data

  return data;
}

function showSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
}

function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('show');
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

// Display movie details on the movie details page
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIdata(`movie/${movieId}`);
  displayBackgroundImage('movie', movie.backdrop_path); // Set background (overlay) image
  const div = document.createElement('div');
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
  <div class="details-top">
          <div>
      ${moviePoster}
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movie.status
            } </li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `${company.name}`)
            .join(' ')}</div>
        </div>
  `;
  document.querySelector('#movie-details').appendChild(div);
}

// Display popular TV shows on the shows page
async function displayPopularShows() {
  const { results } = await fetchAPIdata('tv/popular');

  results.forEach((show) => {
    console.log(show);
    const div = document.createElement('div');
    div.classList.add('card');

    const showPoster = show.poster_path
      ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />`
      : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`;

    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${showPoster}
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display show details on the tv details page
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIdata(`tv/${showId}`);
  displayBackgroundImage('tv', show.backdrop_path); // Set background (overlay) image
  const div = document.createElement('div');
  const showPoster = show.poster_path
    ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
    : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`;
  div.innerHTML = `
  <div class="details-top">
          <div>
            ${showPoster}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Air Date: ${show.first_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href=${
              show.homepage
            } target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `${company.name}`)
            .join(', ')}</div>
        </div>
  `;
  document.querySelector('#show-details').appendChild(div);
}

// Display movies in the slider on the home page
async function displaySliderMovie() {
  const { results } = await fetchAPIdata('movie/now_playing');
  results.forEach((movie) => {
    console.log(movie);
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
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
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
        1
      )} / 10
    </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}

// Initialize Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto', // Use 'auto' for better responsiveness
    spaceBetween: 20, // Reduced space for smaller screens
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000, // Faster autoplay for better engagement
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 }, // Added breakpoint for very small screens
      480: { slidesPerView: 1.5 }, // Adjusted for small devices
      640: { slidesPerView: 2 }, // Adjusted for medium devices
      768: { slidesPerView: 3 }, // Adjusted for tablets
      1024: { slidesPerView: 4 }, // Adjusted for larger tablets
      1200: { slidesPerView: 6 }, // Standard for desktops
    },
    pagination: {
      el: '.swiper-pagination', // Added pagination for better navigation
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next', // Added navigation buttons
      prevEl: '.swiper-button-prev',
    },
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

// Format numbers with commas
// Example: 1000 -> 1,000
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display background image (overlay)
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100%';
  overlayDiv.style.width = '100%';
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.12';
  overlayDiv.style.backdropFilter = 'blur(2px)';
  overlayDiv.style.borderRadius = '15px';
  overlayDiv.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Routing
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Welcome to the home page!');
      displaySliderMovie();
      displayPopularMovies();
      break;

    case '/shows.html':
      console.log('Welcome to the shows page!');
      displayPopularShows();
      break;

    case '/movie-details.html':
      console.log('Welcome to the movie details page!');
      displayMovieDetails();
      break;

    case '/tv-details.html':
      console.log('Welcome to the TV details page!');
      displayShowDetails();
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
