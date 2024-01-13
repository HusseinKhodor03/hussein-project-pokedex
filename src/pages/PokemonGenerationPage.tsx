import { useParams } from "react-router-dom";
import useGeneration from "../hooks/useGeneration";
import { useEffect, useState } from "react";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonDetails from "../entities/PokemonDetails";
import PokemonCard from "../components/PokemonCard";
import "../styles/PokemonGenerationPage.css";
import LoadingSpinner from "../components/LoadingSpinner";

function PokemonGenerationPage() {
  const pageSize = 15;
  const { name } = useParams();
  const [page, setPage] = useState<number>(1);
  const {
    data: generation,
    isLoading: isGenerationLoading,
    isError: isGenerationError,
  } = useGeneration(name!);

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

  const {
    data: pokemonDetails,
    isLoading: isPokemonDetailsLoading,
    isError: isPokemonDetailsError,
  } = usePokemonDetails(ids, 0);

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

  if (isGenerationError || isPokemonDetailsError || !isNaN(parseInt(name!)))
    throw new Error();
  if (isGenerationLoading || isPokemonDetailsLoading) return <LoadingSpinner />;

  return (
    <section className="container pokemon-gen">
      <h2 className="pokemon-gen__heading">{name} Pokémon</h2>
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

export default PokemonGenerationPage;
