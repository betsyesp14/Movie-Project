
const apiKey = "fa8ee04ba5918558c5d3391ffff11615";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const img_Url = `https://image.tmdb.org/t/p/w1280/`;

const main = document.getElementById('main');
const search = document.getElementById('search')
const form = document.getElementById('form')

fetchMovies(apiUrl)

async function fetchMovies() {
	
		const response = await fetch(apiUrl);
		const data = await response.json();

		console.log(data.results);
		showMovies(data.results);
		
	}

	function showMovies(data) {
		main.innerHTML = '';

		data.forEach(movie => {
			const {title, name, poster_path} = movie;
			const moviesElement = document.createElement ('div')
			moviesElement.classList.add('movie');
			moviesElement.innerHTML = `
				<img src="${img_Url + poster_path}" alt="${title}"/>
				<div class='movies_info'>
				<h3>${title}</h3>
				<div/>
			`;
			main.appendChild(moviesElement);
		})
	}

	form.addEventListener('submit' , (e) =>{
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

    ball.addEventListener("click",()=>{
        items.forEach(item=>{
            item.classList.toggle("active")
        })
        ball.classList.toggle("active")
    })
