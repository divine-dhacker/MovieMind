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
        const url = `https://quotacle.com/api/v1/quotes?query=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    displayShowDetails(data.results);
                } else {
                    movieDetails.innerHTML = '<p>No quotes found. Please try another speech.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                movieDetails.innerHTML = '<p>An error occurred. Please try again later.</p>';
            });
    }

    function displayShowDetails(results) {
        movieDetails.innerHTML = results.map(result => `
            <div class="movie-result">
                ${result.image_url ? `<img src="${result.image_url}" alt="${result.title}">` : ''}
                <h3>${result.title}</h3>
                <p><strong>Quote:</strong> "${result.quote}"</p>
                <p><strong>Author:</strong> ${result.author}</p>
                <div style="clear:both;"></div>
            </div>
        `).join('');
    }
});
