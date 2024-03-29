import { useParams } from "react-router-dom";
import useRegion from "../hooks/useRegion";
import { useEffect, useState } from "react";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonDetails from "../entities/PokemonDetails";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonCard from "../components/PokemonCard";
import useGeneration from "../hooks/useGeneration";
import useErrorStore from "../stores/error-store";
import capitalizeFirstLetter from "../services/capitalize-first-letter";

function PokemonRegionPage() {
  const pageSize = 15;
  const { name } = useParams();
  const [page, setPage] = useState<number>(1);
  const {
    data: region,
    isLoading: isRegionLoading,
    isError: isRegionError,
  } = useRegion(name!);

  document.title = `Pokédex - ${capitalizeFirstLetter(name!)} Region Pokémon`;

  const { data: generation, isLoading: isGenerationLoading } = useGeneration(
    region?.main_generation?.name!
  );

  const urls: string[] = [];

  generation?.pokemon_species.forEach((pokemon) => {
    urls.push(pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  ids.sort((a, b) => parseInt(a) - parseInt(b));

  const { data: pokemonDetails, isLoading: isPokemonDetailsLoading } =
    usePokemonDetails(ids, 0);

  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonDetails[]>(
    []
  );

  useEffect(() => {
    setPage(1);
    setDisplayedPokemon([]);
  }, [name]);

  useEffect(() => {
    if (pokemonDetails) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const nextBatch = pokemonDetails.slice(startIndex, endIndex);
      setDisplayedPokemon((prevDisplayedPokemon) => [
        ...prevDisplayedPokemon,
        ...nextBatch,
      ]);
    }
  }, [page, pokemonDetails]);

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const setRegionError = useErrorStore((selector) => selector.setRegionError);
  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));
  const isNullError = region?.main_generation === null;

  if (isNullError) setRegionError(true);
  else setRegionError(isRegionError);

  setNaNError(isNaNError);

  if (isRegionError || isNaNError || isNullError) throw new Error();
  if (isRegionLoading || isGenerationLoading || isPokemonDetailsLoading)
    return <LoadingSpinner />;

  return (
    <section className="container pokemon-gen">
      <h2 className="pokemon-gen__heading">Pokémon from the {name} region</h2>
      <div className="pokemon-gen__cards">
        {displayedPokemon.map((pokemonName, index) => (
          <PokemonCard key={index} pokemon={pokemonName} />
        ))}
      </div>
      {displayedPokemon.length < pokemonDetails?.length! && (
        <div className="pokemon-gen__btn-container">
          <button onClick={handleLoadMoreClick} className="pokemon-gen__btn">
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

export default PokemonRegionPage;
