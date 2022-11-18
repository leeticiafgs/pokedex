const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function showPokemon(pokemonNumber){
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`

    fetch(url)
        .then((response) => response.json())
        .then((detailRequests) => abrirModal(detailRequests))     
       
    // ABRIR MODAL
    let modal=document.querySelector('.modal')
    modal.style.display='block'

            
}

function fecharModal(){
    let modal=document.querySelector('.modal')
    modal.style.display='none'

}

function abrirModal(pokemonDetails){   
    
    pokemonNumber = pokemonDetails.id
    pokemonName = pokemonDetails.name

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonTypes = types
    pokemonType = type

    pokemonPhoto = pokemonDetails.sprites.other.dream_world.front_default


    console.log(pokemonDetails)

    document.getElementById('number').innerHTML = 'Number: #' + pokemonNumber
    document.getElementById('name').innerHTML = 'Name: ' + pokemonName


}

