const pokeApi = {};
pokeApi.getPokemonDetail = pokemon => {
	return fetch(pokemon.url).then(response => response.json());
};

pokeApi.getPokemons = (offset = 0, limit = 1) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
	// Buscando a lista de pokemon através de uma requisição
	return (
		fetch(url)
			// Convertendo o response para json para manipular
			.then(response => response.json())
			// Vem com mt detalhe entao vamos querer apenas os resultados
			.then(jsonBody => jsonBody.results)
			// Mapeando os pokemons para uma lista de requisição dos detalhes de cada pokemon
			.then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
			// Esperando todas as requisições terminarem
			.then(detailRequests => Promise.all(detailRequests))
			.then(pokemonsDetails => pokemonsDetails)
			.catch(error => console.log(error))
	);
};

Promise.all([
	fetch('https://pokeapi.co/api/v2/pokemon/1'),
	fetch('https://pokeapi.co/api/v2/pokemon/2'),
	fetch('https://pokeapi.co/api/v2/pokemon/3'),
	fetch('https://pokeapi.co/api/v2/pokemon/4'),
]).then(results => {
	console.log(results);
});
