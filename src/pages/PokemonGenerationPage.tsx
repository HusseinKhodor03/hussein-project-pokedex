import { useParams } from "react-router-dom";
import PokemonGenerationList from "../components/PokemonGenerationList";
import useGeneration from "../hooks/useGeneration";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import useErrorStore from "../stores/error-store";
import "../styles/PokemonGenerationPage.css";

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
    <section className="container pokemon-generation">
      <PokemonGenerationList
        name={name!}
        pokemonGenerationList={pokemonGenerationList!}
      />
    </section>
  );
}

export default PokemonGenerationPage;
