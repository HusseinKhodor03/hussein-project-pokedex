import { useParams } from "react-router-dom";
import useType from "../hooks/useType";
import { useEffect, useState } from "react";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonDetails from "../entities/PokemonDetails";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonCard from "../components/PokemonCard";

function PokemonTypePage() {
  const pageSize = 15;
  const { name } = useParams();
  const [page, setPage] = useState<number>(1);
  const {
    data: pokemon,
    isLoading: isTypeLoading,
    isError: isTypeError,
  } = useType(name!);

  const urls: string[] = [];

  pokemon?.pokemon.forEach((pokemon) => {
    urls.push(pokemon.pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

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

  if (isTypeError || isPokemonDetailsError || !isNaN(parseInt(name!)))
    throw new Error();
  if (isTypeLoading || isPokemonDetailsLoading) return <LoadingSpinner />;

  return (
    <section className="container pokemon-gen">
      <h2 className="pokemon-gen__heading">{name} Type Pokémon</h2>
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

export default PokemonTypePage;
