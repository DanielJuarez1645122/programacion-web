import { useState, useEffect } from 'react';
import Title from './title';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );

      setPokemonList(detailedPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <Title />
      <div className="father">
      {pokemonList.map(pokemon => (
        <div className='item' key={pokemon.id}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <div className="pokemon-types">
          <h5>Tipo</h5>
            {pokemon.types.map((t) => (
              <span key={t.slot}>
                {`|${t.type.name}|`}
              </span>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
