const d = document,
	$main = d.querySelector("main"),
	$links = d.querySelector(".links");
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemon(url) {
	try {
		$main.innerHTML = `<img clas="loader" src="../assets/loader.svg" alt="Cargando...."/>`;
		let res = await fetch(url),
			json = await res.json(),
			$template = "",
			$prevLink, $nextLink;
			console.log(json);
		if (!res.ok)
			throw {
				status: res.status,
				statusText: res.statusText,
			};

		for (let i = 0; i < json.results.length; i++) {
			try {
				let res = await fetch(json.results[i].url);
				pokemon = await res.json();
				if (!res.ok)
					throw {
						status: res.status,
						statusText: res.statusText,
					};

				$template += `
    <figure>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
					<figcaption>
					${pokemon.name}
					</figcaption>
        </figure>`;
			} catch (err) {
				let message = err.statusText || "Ocurrio un Error";
				$template += `
				<figure>
						<figcation>
								Error${err.status}:${message}
						</figcation>
      </figure>`;
			}
		}

		$main.innerHTML = $template;

		$prevLink= json.previous ?`<a href="${json.previous}">⏮️<a/>`:"";
	  $nextLink= json.next ?`<a href="${json.next}">⏭️<a/>`:"";
		$links.innerHTML=$prevLink + " "+$nextLink;


	} catch (err) {
		console.log(err);
		let message = err.statusText || "Ocurrio un Error";
		$main.innerHTML = `<p> Error ${err.status}:${message}</p>`;
	}
}
d.addEventListener("DOMContentLoaded", (e) => loadPokemon(pokeAPI));
d.addEventListener('click',e=>{
	if(e.target.matches(".links a")){
		e.preventDefault();
		loadPokemon(e.target.getAttribute("href"));
	}

});