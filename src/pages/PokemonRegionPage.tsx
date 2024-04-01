import { useParams } from "react-router-dom";
import PokemonRegionList from "../components/PokemonRegionList";
import useRegion from "../hooks/useRegion";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import useErrorStore from "../stores/error-store";
import "../styles/PokemonRegionPage.css";

function PokemonRegionPage() {
  const { name } = useParams();
  const { data: pokemonRegionList } = useRegion(name!);

  document.title = `Pokédex - ${capitalizeFirstLetter(name!)} Region Pokémon`;

  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));
  setNaNError(isNaNError);

  if (isNaNError) throw new Error();

  return (
    <section className="container pokemon-region">
      <PokemonRegionList name={name!} pokemonRegionList={pokemonRegionList!} />
    </section>
  );
}

export default PokemonRegionPage;
