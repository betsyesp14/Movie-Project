
const apiKey = "fa8ee04ba5918558c5d3391ffff11615";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const img_Url = `https://image.tmdb.org/t/p/w1280/`;

const main = document.getElementById('main');
const search = document.getElementById('search')
const form = document.getElementById('form')

async function fetchMovies(url) {
	try {
		const response  = await fetch(url); 
		if (!response.ok) {
			throw new Error('Network response was not ok');

		}
		const data = await response.json();
		showMovies(data.results);
	} catch (error) {
		console.error('Error fetching movies:' , error);
			main.innerHTML = '<h2>Error loading movies. Please try again later. <h2/>'
	}

}

function showMovies(movies) {
	main.innerHTML = '';

	if (!movies || movies.length === 0) {
		main.innerHTML = '<h2>No movies found</h2>';
		return; 
	}

	movies.forEach(movie => {
		const { title, poster_path }  = movie;

		if (title && poster_path) {
			const moviesElement = document.createElement('div');
			moviesElement.classList.add('movie'); 
			moviesElement.innerHTML = `
				<img src= "${img_Url  + poster_path}" alt="${title}" onerror="this.src='placeholder-image.jpg'"/>
				<div class="movies_info">
					<h3>${title}</h3>
				</div>`;
				main.appendChild(moviesElement);
		}
	});
}

form.addEventListener('submit' , async (e) => {
	e.preventDefault();
	const searchTerm = search.ariaValueMax.trim();

	if (searchTerm) {
		const searchWithQuery = `${searchUrl}&query=${encodedURIComponent(searchTerm)}`;
		await fetchMovies(searchWithQuery); 

	} else {
		await fetchMovies(apiUrl);
	}
});
	

form.addEventListener('submit' , (e) => {
	e.preventDefault()
	const searchTerm = search.value;

	if(searchTerm){
		fetchMovies(searchUrl+ '&query=' +searchTerm)
	}else{
		fetchMovies(apiKey)
	}
})

const ball = document.querySelector(".toggle__ball");
const items = document.querySelectorAll("body,.toggle");

ball.addEventListener("click",() =>{
	items.forEach(item=>{
		item.classList.toggle("active")
	})
	ball.classList.toggle("active")
})
