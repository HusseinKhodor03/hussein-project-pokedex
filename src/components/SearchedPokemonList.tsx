import { useEffect, useState } from "react";
import Pokemon from "../entities/Pokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import { FetchResponse } from "../services/api-client";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "../entities/PokemonDetails";
import useErrorStore from "../stores/error-store";
import "../styles/SearchedPokemonList.css";

interface SearchedPokemonListProps {
  query: string;
  allPokemon: FetchResponse<Pokemon>;
}

function SearchedPokemonList({ query, allPokemon }: SearchedPokemonListProps) {
  const pageSize = 15;
  const [page, setPage] = useState<number>(1);
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonDetails[]>(
    []
  );

  const urls: string[] = [];

  allPokemon?.results.forEach((pokemon) => {
    urls.push(pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  ids.sort((a, b) => parseInt(a) - parseInt(b));

  const { data: pokemonDetails } = usePokemonDetails(ids, 0);

  const filteredPokemon =
    pokemonDetails?.filter((pokemon) => {
      return pokemon.name.includes(query!);
    }) || [];

  const loadInitialBatch = () => {
    const initialBatch = filteredPokemon.slice(0, pageSize);
    setDisplayedPokemon(initialBatch);
    setPage(1);
  };

  useEffect(() => {
    loadInitialBatch();
  }, [query]);

  const handleLoadMoreClick = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const nextBatch = filteredPokemon.slice(startIndex, endIndex);
    setDisplayedPokemon((prevDisplayedPokemon) => [
      ...prevDisplayedPokemon,
      ...nextBatch,
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  const setIsSearchEmptyArrayError = useErrorStore(
    (selector) => selector.setIsSearchEmptyArrayError
  );
  const isSearchEmptyArrayError = filteredPokemon.length === 0;
  setIsSearchEmptyArrayError(isSearchEmptyArrayError);

  if (isSearchEmptyArrayError) throw new Error();

  return (
    <>
      <h2 className="searched-pokemon-heading">
        Search Results for "{query.replace(/-/g, " ")}"
      </h2>
      <div className="searched-pokemon-cards">
        {displayedPokemon?.map((pokemonName, index) => (
          <PokemonCard key={index} pokemon={pokemonName} />
        ))}
      </div>
      {displayedPokemon.length < filteredPokemon?.length! && (
        <div className="searched-pokemon-btn-container">
          <button
            onClick={handleLoadMoreClick}
            className="searched-pokemon-btn-container__btn"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default SearchedPokemonList;
