import { useParams } from "react-router-dom";
import useType from "../hooks/useType";
import useErrorStore from "../stores/error-store";
import capitalizeFirstLetter from "../services/capitalize-first-letter";
import PokemonTypeList from "../components/PokemonTypeList";

function PokemonTypePage() {
  const { name } = useParams();
  const { data: pokemonTypeList } = useType(name!);

  document.title = `Pokédex - ${capitalizeFirstLetter(name!)} Type Pokémon`;

  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const setIsEmptyArrayError = useErrorStore(
    (selector) => selector.setIsEmptyArrayError
  );

  const isNaNError = !isNaN(parseInt(name!));
  const isEmptyArrayError = pokemonTypeList?.pokemon.length === 0;

  setNaNError(isNaNError);
  setIsEmptyArrayError(isEmptyArrayError);

  if (isNaNError || isEmptyArrayError) throw new Error();

  return (
    <section className="container pokemon-gen">
      <PokemonTypeList name={name!} pokemonTypeList={pokemonTypeList!} />
    </section>
  );
}

export default PokemonTypePage;
