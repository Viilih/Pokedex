const list = document.querySelector('#pokemonListJS');
function pokemonType(pokemonTypes) {
	return pokemonTypes.map(
		slotType => `<span class ="type">${slotType.type.name}</span>`
	);
}
function pokemonListHtml(pokemon) {
	return `
	<li>
		<span class="number">#${pokemon.order}</span>
		<div class= "titleArea"> 
			<span class="title">${pokemon.name}</span>
		</div>
		
				<div class="info">
					<div class="types">
						${pokemonType(pokemon.types).join('')}
					</div>
						<img
							src="${pokemon.sprites.other.dream_world.front_default}"
							alt="${pokemon.name}"
						/>
				</div>
	</li>`;
}

pokeApi.getPokemons().then((pokemons = []) => {
	list.innerHTML += pokemons.map(pokemonListHtml).join('');
});
