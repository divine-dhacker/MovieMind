document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const speechInput = document.getElementById('speech-input');
    const movieDetails = document.getElementById('movie-details');
    const loader = document.getElementById('loader');

    searchBtn.addEventListener('click', () => {
        const query = speechInput.value.trim();
        if (query) {
            searchShows(query);
        }
    });

    function searchShows(query) {
        loader.style.display = 'block';
        movieDetails.innerHTML = '';

        const url = `https://quotacle.com/api/v1/quotes?query=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                loader.style.display = 'none';
                if (data && data.results && data.results.length > 0) {
                    displayShowDetails(data.results);
                } else {
                    movieDetails.innerHTML = '<p>No quotes found. Please try another speech.</p>';
                }
            })
            .catch(error => {
                loader.style.display = 'none';
                console.error('Error fetching data:', error);
                movieDetails.innerHTML = '<p>An error occurred. Please try again later.</p>';
            });
    }

    function displayShowDetails(results) {
        movieDetails.innerHTML = results.map(result => `
            <div class="movie-result">
                <img src="${result.source_image_url || 'https://via.placeholder.com/100x150'}" alt="${result.title}">
                <div class="movie-info">
                    <h3>${result.title}</h3>
                    <p><strong>Quote:</strong> "${result.quote}"</p>
                    <p><strong>Author:</strong> ${result.author}</p>
                </div>
            </div>
        `).join('');
    }
});
