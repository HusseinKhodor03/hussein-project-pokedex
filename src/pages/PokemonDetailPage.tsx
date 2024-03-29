import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useErrorStore from "../stores/error-store";
import EvolutionChain from "../components/EvolutionChain";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import PokemonImgInfo from "../components/PokemonImgInfo";

function PokemonDetailPage() {
  const { name } = useParams();
  const {
    data: pokemonDetail,
    isLoading: isPokemonDetailLoading,
    isError: isPokemonDetailError,
  } = usePokemonDetail(name!);

  document.title = `Pokédex - Pokémon: ${capitalizeFirstLetter(name!)}`;

  const pokemonID = pokemonDetail?.id;
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
  const { data: pokemon, isLoading: isPokemonLoading } = usePokemon(offset, 5);

  pokemon?.results.forEach((pokemon) => names.push(pokemon.name));

  const { data: nearbyPokemon, isLoading: isNearbyLoading } =
    usePokemonDetails(names);

  const setPokemonDetailError = useErrorStore(
    (selector) => selector.setPokemonDetailError
  );
  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));

  setPokemonDetailError(isPokemonDetailError);
  setNaNError(isNaNError);

  if (isPokemonDetailError || isNaNError) throw new Error();

  if (isPokemonDetailLoading || isPokemonLoading || isNearbyLoading)
    return <LoadingSpinner />;

  return (
    <section className="container pokemon-detail">
      <PokemonImgInfo pokemon={pokemonDetail} />
      <EvolutionChain pokemon={pokemonDetail} />
      <h3 className="pokemon-detail__stats-heading">Stats</h3>
      <section className="pokemon-detail__stats">
        {pokemonDetail?.stats?.map((stat, index) => (
          <div key={index}>
            <p className="pokemon-detail__stats-text">
              {stat.stat.name.replace(/-/g, " ")}
            </p>
            <p className="pokemon-detail__stats-stat">{stat.base_stat}</p>
          </div>
        ))}
      </section>
      <h3 className="pokemon-detail__nearby-heading">
        Nearby Pokémon in the Pokédex
      </h3>
      <section className="pokemon-detail__nearby">
        {nearbyPokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </section>
  );
}

export default PokemonDetailPage;
