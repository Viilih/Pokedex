const list = document.querySelector('#pokemonListJS');

function pokemonListHtml(pokemon) {
	return `
	<li class = "${pokemon.mainType}">
		<span class="number">#${pokemon.number}</span>
		<div class= "titleArea"> 
			<span class="title">${pokemon.name}</span>
			<span class="subtitle">Teste qualquer</span>
		</div>
		
				<div class="info">
					<div class="types">
						${pokemon.types.map(type => `<span class ="type">${type}</span>`).join('')}
					</div>
						<div class = "image">
							<img
								src="${pokemon.photo}"
								alt="${pokemon.name}"
							/>
						</div>
				</div>
	</li>`;
}

pokeApi.getPokemons().then((pokemons = []) => {
	list.innerHTML += pokemons.map(pokemonListHtml).join('');
});
