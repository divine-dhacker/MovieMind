document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const speechInput = document.getElementById('speech-input');
    const movieDetails = document.getElementById('movie-details');

    searchBtn.addEventListener('click', () => {
        const query = speechInput.value.trim();
        if (query) {
            searchShows(query);
        }
    });

    function searchShows(query) {
        const url = `http://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const show = data[0].show;
                    displayShowDetails(show);
                } else {
                    movieDetails.innerHTML = '<p>No shows found. Please try another speech.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                movieDetails.innerHTML = '<p>An error occurred. Please try again later.</p>';
            });
    }

    function displayShowDetails(show) {
        movieDetails.innerHTML = `
            <h2>${show.name}</h2>
            <p><strong>Genres:</strong> ${show.genres.join(', ')}</p>
            <p><strong>Status:</strong> ${show.status}</p>
            <p><strong>Rating:</strong> ${show.rating.average ? show.rating.average : 'N/A'}</p>
            <p><strong>Summary:</strong> ${show.summary}</p>
        `;
    }
});
