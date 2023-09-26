import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import "../styles/PokemonCard.css";

function PokemonCard() {
  const { data: pokemon } = usePokemon();

  const names: string[] = [];
  pokemon?.results.forEach((pokemon) => names.push(pokemon.name));
  const { data: pokemonDetail } = usePokemonDetails(names);

  return (
    <>
      {pokemonDetail?.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <img
            src={pokemon.sprites.front_default}
            className="pokemon-card__image"
          />
          <h3 className="pokemon-card__heading">{pokemon.name}</h3>
        </div>
      ))}
    </>
  );
}

export default PokemonCard;
