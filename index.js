
const apiKey = "fa8ee04ba5918558c5d3391ffff11615";
const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
const moviesContainer = document.getElementById("movies");

async function fetchMovies() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		data.results.forEach(media => {
			const movieCard = createMovieCard(media);
			moviesContainer.appendChild(movieCard);
		});

	} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	function createMovieCard(media) {
		const { title, name, backdrop_path } = media;

		const movieCard = document.createElement("div");
		movieCard.classList.add("movie__item")

		movieCard.innerHTML = `
		<img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movie_img-rounded">
		<div class = "title">${title || name}</div>
		`;
		return movieCard;
	}

	fetchMovies();

	const ball = document.querySelector(".toggle__ball");
	const items = document.querySelectorAll("body,.toggle");

	ball.addEventListener("click",()=>{
		items.forEach(item=>{
			item.classList.toggle("active")
		})
		ball.classList.toggle("active")
	})

	const form = document.querySelector('form');
	const container = document.querySelector('movies');

	form.addEventListener('submit',(e)=>{
		e.preventDefault();
		let query = form.querySelector('input').value;
		console.log(query);

		fetchMovie(query);
	})

async function fetchMovie(searchTerm){
	const req = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&s=${searchTerm}`)
	const res = await req.json();
	console.log(res);

}

function filterMovies(event) {
	console.log(event)
	
}