const pokeApi = {};

function classDetails(pokeDetail) {
	const pokemon = new Pokemon();
	pokemon.name = pokeDetail.name;
	pokemon.number = pokeDetail.order;

	const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
	const [mainType] = types;

	pokemon.types = types;
	pokemon.mainType = mainType;

	pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

	return pokemon;
}

pokeApi.getPokemonDetail = pokemon => {
	return fetch(pokemon.url)
		.then(response => response.json())
		.then(classDetails);
};

pokeApi.getPokemons = (offset = 600, limit = 100) => {
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
]);
