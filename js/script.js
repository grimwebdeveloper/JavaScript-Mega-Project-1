const global = {
  currentPage: window.location.pathname,
};

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
