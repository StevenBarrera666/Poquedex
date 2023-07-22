const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector("#spinner");
const previus = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 8;

previus.addEventListener('click', ()=> {
  if(offset != 1){
    offset -=9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset,limit);
  }

});

next.addEventListener('click', ()=> {
  offset +=9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset,limit);
});


function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
     .then((res) => res.json())
     .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
  

     });
}

 function fetchPokemons(offset,limit) {
  spinner.style.display = "block";

  for (let i = offset;i <= offset + limit; i++){
    fetchPokemon(i);
     
  } 
}
  function createPokemon(pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);



    const card =document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = sprite.src = pokemon.sprites.other.home.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent= `#${pokemon.id.toString().padStart(3,0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back'); 

    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
  }

  function progressBars(stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");

    for ( let i = 0; i < 3; i++){
      const stat = stats[i];

      const statPercent = stat.base_state / 5 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");

      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;

      const progress = document.createElement("div");
      progress.classList.add("progress");

      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("arial-valuenow", stat.base_stat);
      progressBar.setAttribute("arial-valuenow", 0);
      progressBar.setAttribute("arial-valuenow", 200);
      progressBar.style.width= statPercent;

      progressBar.textContent = stat.base_stat;

      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);

      statsContainer.appendChild(statContainer); 
      


    }

    return statsContainer;

  }



  function removeChildNodes(parent){
    while (parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
  }

  fetchPokemons(offset,limit);



  /*Primero, se selecciona un elemento con la clase "pokemon-container" 
  utilizando document.querySelector('.pokemon-container') y se guarda en la variable pokemonContainer. 
  Esto indica que hay un elemento en el documento HTML con la clase "pokemon-container" 
  en el que se agregarán los Pokémon.

  La función fetchPokemon(id) es una función que realiza una solicitud (fetch) a la API de PokeAPI para 
  obtener los datos de un Pokémon específico, dado su ID. La URL de la API se construye usando el ID proporcionado.
  Después de recibir la respuesta, se convierte en formato JSON y se llama a la función createPokemon(data) 
  para crear un elemento en el documento HTML con los datos del Pokémon.

  La función fetchPokemons(number) es una función que toma un número como parámetro e itera desde 1 hasta ese número, llamando a fetchPokemon(i) en cada iteración. 
  Esto permite obtener y mostrar varios Pokémon en la página, ya que llama a fetchPokemon con diferentes IDs.

  La función createPokemon(pokemon) es la que se llama para crear un nuevo elemento en el DOM con los datos del Pokémon recibidos como argumento.
   Aquí es donde se construye la estructura HTML de un "div" que contiene la información del Pokémon, como el sprite, el número y el nombre.
   Luego, se agrega este "div" al elemento pokemonContainer, que fue seleccionado al principio.

   En el cuerpo de la función createPokemon(pokemon), se crean varios elementos HTML, como "div", "img", "p", para representar la tarjeta del Pokémon.
    Se establecen las clases y atributos correspondientes para darle el estilo adecuado.

    El sprite del Pokémon se carga en un elemento de imagen "img" y se establece como el atributo "src" de la imagen utilizando 
    pokemon.sprites.front_default, que obtiene la URL del sprite del Pokémon desde los datos recibidos.

    El número y el nombre del Pokémon se establecen en elementos "p" utilizando los datos recibidos del Pokémon.

    Todos estos elementos creados (sprite, número, nombre) se agregan al "div" principal (card) para representar la tarjeta del Pokémon.

    Finalmente, la tarjeta del Pokémon (el "div" principal) se agrega al elemento con la clase "pokemon-container" (pokemonContainer) para que aparezca en el documento HTML y sea visible en la página.
    
    Finalmente, se llama a fetchPokemons(9) para obtener y mostrar los primeros 9 Pokémon en la página (desde el ID 1 hasta el ID 9) utilizando las funciones anteriores*/