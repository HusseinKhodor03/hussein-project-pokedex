import { useParams } from "react-router-dom";
import useGeneration from "../hooks/useGeneration";
import "../styles/PokemonGenerationPage.css";
import useErrorStore from "../stores/error-store";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import PokemonGenerationList from "../components/PokemonGenerationList";

function PokemonGenerationPage() {
  const { name } = useParams();
  const { data: pokemonGenerationList } = useGeneration(name!);

  document.title = `Pokédex - ${capitalizeFirstLetter(name!).replace(
    / /g,
    "-"
  )} Pokémon`;

  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));
  setNaNError(isNaNError);

  if (isNaNError) throw new Error();

  return (
    <section className="container pokemon-gen">
      <PokemonGenerationList
        name={name!}
        pokemonGenerationList={pokemonGenerationList!}
      />
    </section>
  );
}

export default PokemonGenerationPage;
