import { useParams } from "react-router-dom";
import useRegion from "../hooks/useRegion";
import useErrorStore from "../stores/error-store";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import PokemonRegionList from "../components/PokemonRegionList";

function PokemonRegionPage() {
  const { name } = useParams();
  const { data: pokemonRegionList } = useRegion(name!);

  document.title = `Pokédex - ${capitalizeFirstLetter(name!)} Region Pokémon`;

  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));
  setNaNError(isNaNError);

  if (isNaNError) throw new Error();

  return (
    <section className="container pokemon-gen">
      <PokemonRegionList name={name!} pokemonRegionList={pokemonRegionList!} />
    </section>
  );
}

export default PokemonRegionPage;
