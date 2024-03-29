import PokemonDetails from "../entities/PokemonDetails";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "./PokemonCard";
import "../styles/NearbyPokemon.css";

interface NearbyPokemonProps {
  pokemon: PokemonDetails;
}

function NearbyPokemon({ pokemon }: NearbyPokemonProps) {
  const pokemonID = pokemon?.id;
  const names: string[] = [];

  const { data: allPokemon } = usePokemon(0, 100000);

  const urls: string[] = [];

  allPokemon?.results.forEach((pokemon) => {
    urls.push(pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  const lastFivePokemon = ids.slice(-5).map((id) => parseInt(id));

  function calcOffset(id: number) {
    let offset: number;

    if (id < 6) {
      offset = id;
    } else if (lastFivePokemon.includes(id)) {
      offset = id - 8981;
    } else if (id > 10000) {
      offset = id - 8975;
    } else {
      offset = id - 6;
    }
    return offset;
  }

  const offset = calcOffset(pokemonID!);
  const { data: pokemonD } = usePokemon(offset, 5);

  pokemonD?.results.forEach((pokemon) => names.push(pokemon.name));

  const { data: nearbyPokemon } = usePokemonDetails(names);

  return (
    <>
      <h3 className="pokemon-nearby-heading">Nearby Pokémon in the Pokédex</h3>
      <section className="pokemon-nearby">
        {nearbyPokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
}

export default NearbyPokemon;
