const pokemon = document.querySelector('li.pokemon');
const pokemonList = document.querySelector("#pokemonList");
const  limit = 12;
let offset = 0;
const maxRecords = 151;
let pokemons = [];

function loadPokemonItens(offset, limit ){
    if (offset >= maxRecords) {
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        offset = maxRecords;
        return;
    }
    pokeApi.getPokemons(offset, limit).then((loadPokemons = []) => {
        pokemons = pokemons.concat(loadPokemons)
        const newHtml = loadPokemons.map((pokemon) => 
        `
            <li class="pokemon ${pokemon.type} details">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img draggable src="${pokemon.photo}" alt="${pokemon.name}">
                </div> 
            </li>
        `).join('');
        
        pokemonList.innerHTML += newHtml;   
        const detailsButtons = document.querySelectorAll('.details');
        detailsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                details(pokemons[index]);
            });
        });
        
    }); 

}

const overlay = document.querySelector('.overlay');

function details(pokemon) {
    console.log(pokemon);
     // div de sobreposição
     const overlay = document.createElement('div');
     overlay.classList.add('overlay'); 
     overlay.classList.add(pokemon.name);
 
     document.body.appendChild(overlay);
     setTimeout(() => {
        overlay.classList.add('show');
     },10);
 
     // conteudo da div de sobreposição
     const overlayContent = document.createElement('div');
     overlayContent.classList.add('overlay-content');
     overlayContent.classList.add(pokemon.type);
     overlay.appendChild(overlayContent); 
 
     // Nome do Pokemon
     const pokeName = document.createElement('h2');
     pokeName.textContent = pokemon.name; 
     overlayContent.appendChild(pokeName); 
 
     // Imagem do pokemon
     const pokePhoto = document.createElement('img');
     pokePhoto.src = pokemon.photo;
     overlayContent.appendChild(pokePhoto);
 
      // Tipos do Pokemon   
     const about = document.createElement('h2');
     about.textContent ='About';
     overlayContent.appendChild(about);
     const pokeTypes = document.createElement('ul');
     const titleType = document.createElement('p');
     titleType.textContent = 'Type';
     titleType.classList.add('title');

     pokeTypes.appendChild(titleType);
     pokemon.types.forEach((type) => {
         const typeItem = document.createElement('li');
         typeItem.textContent = type;
         typeItem.classList.add('type');
         typeItem.classList.add(type);
         pokeTypes.appendChild(typeItem);
     });
     overlayContent.appendChild(pokeTypes);
     

    //  habilidades do pokemon
    const pokeAbilities = document.createElement('ul');
    const titleAbility = document.createElement('p');
    titleAbility.textContent = pokemon.abilities.length > 1 ? 'Abilities' : 'Ability';
    titleAbility.classList.add('title');
    pokeAbilities.appendChild(titleAbility);
    
    pokemon.abilities.forEach((ability) => {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability;
        pokeAbilities.appendChild(abilityItem);
    });
    
    overlayContent.appendChild(pokeAbilities);
    
    // peso do pokemon  
    const pokeWeight= document.createElement('ul');
    const titleWeight = document.createElement('p');
    titleWeight.textContent = 'Weight';
    titleWeight.classList.add('title');
    const weight = document.createElement('li');
    weight.textContent = pokemon.weight;
    overlayContent.appendChild(pokeWeight);
    pokeWeight.appendChild(titleWeight);
    pokeWeight.appendChild(weight);

    // altura do pokemon
    const pokeHeight = document.createElement('ul');
    const titleHeight = document.createElement('p');
    titleHeight.textContent = 'Height';
    titleHeight.classList.add('title');
    const height = document.createElement('li');
    height.textContent = pokemon.height;
    overlayContent.appendChild(pokeHeight); 
    pokeHeight.appendChild(titleHeight);
    pokeHeight.appendChild(height);
    


     // Botão de Fechar
     const buttonClose = document.createElement('button');
     buttonClose.textContent = 'X';
     overlayContent.appendChild(buttonClose);
 
     buttonClose.onclick = () => {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
            console.clear();
        }, 300)
     }
}

loadPokemonItens(offset, limit);
const loadMoreButton = document.querySelector('#loadMoreButton'); 
loadMoreButton.addEventListener('click', () =>{
    offset+= limit; 
    const amountRecordNextPage = offset + limit; 
    if(amountRecordNextPage >= maxRecords){ 
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset,limit)
    }
})