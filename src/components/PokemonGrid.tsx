import Pokemon from "../entities/Pokemon";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "./PokemonCard";
import "../styles/PokemonGrid.css";

function PokemonGrid() {
  const generations: string[] = [
    "Generation-I",
    "Generation-Ii",
    "Generation-Iii",
    "Generation-Iv",
    "Generation-V",
    "Generation-Vi",
    "Generation-Vii",
    "Generation-Viii",
    "Generation-Ix",
  ];
  const offsets: number[] = [0, 151, 251, 386, 494, 649, 721, 809, 905];
  const data: Pokemon[][] = [];

  const fetchPromises = offsets.map((offset) => usePokemon(offset));
  const responses = fetchPromises;

  responses.forEach((response) => {
    data.push(response.data?.results || []);
  });

  const names: string[] = [];

  data.map((genPokemon) => {
    genPokemon.forEach((pokemon) => {
      names.push(pokemon.name);
    });
  });

  const { data: pokemonDetail } = usePokemonDetails(names);

  const groupedPokemon = [];

  if (pokemonDetail)
    for (let i = 0; i < pokemonDetail.length; i += 5) {
      groupedPokemon.push(pokemonDetail.slice(i, i + 5));
    }

  return (
    <>
      {groupedPokemon.map((generationPokemon, generationIndex) => (
        <div className="container pokemon-home">
          <h2 className="pokemon-home__heading">
            {generations[generationIndex]}
          </h2>
          <div key={generationIndex} className="pokemon-home__generation">
            {generationPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <button className="pokemon-home__button">
            See more Pokémon from {generations[generationIndex]}
          </button>
        </div>
      ))}
    </>
  );
}

export default PokemonGrid;
