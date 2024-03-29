import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import useErrorStore from "../stores/error-store";
import EvolutionChain from "../components/EvolutionChain";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import PokemonImgInfo from "../components/PokemonImgInfo";
import PokemonStats from "../components/PokemonStats";
import NearbyPokemon from "../components/NearbyPokemon";

function PokemonDetailPage() {
  const { name } = useParams();
  const {
    data: pokemonDetail,
    isLoading: isPokemonDetailLoading,
    isError: isPokemonDetailError,
  } = usePokemonDetail(name!);

  document.title = `Pokédex - Pokémon: ${capitalizeFirstLetter(name!)}`;

  const setPokemonDetailError = useErrorStore(
    (selector) => selector.setPokemonDetailError
  );
  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));

  setPokemonDetailError(isPokemonDetailError);
  setNaNError(isNaNError);

  if (isPokemonDetailError || isNaNError) throw new Error();

  if (isPokemonDetailLoading) return <LoadingSpinner />;

  return (
    <section className="container pokemon-detail">
      <PokemonImgInfo pokemon={pokemonDetail} />
      <EvolutionChain pokemon={pokemonDetail} />
      <PokemonStats pokemon={pokemonDetail} />
      <NearbyPokemon pokemon={pokemonDetail} />
    </section>
  );
}

export default PokemonDetailPage;
