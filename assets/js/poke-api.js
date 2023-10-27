const pokeApi = {};

function convertPokeApiDetailPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities;
    
    pokemon.abilities = abilities;
    pokemon.ability = ability;

    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; 

    pokemon.types = types;
    pokemon.type = type;

    // pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;

    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;

    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
                .then((response) => response.json())
                .then(convertPokeApiDetailPokemon)
}
pokeApi.getPokemons = (offset,limit) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonDetails) => pokemonDetails)
        // .catch((error) => console.error(error));
}
