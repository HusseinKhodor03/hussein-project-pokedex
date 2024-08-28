import { useEffect, useState } from "react";
import PokemonDetails from "../entities/PokemonDetails";
import Region from "../entities/Region";
import usePokedex from "../hooks/usePokedex";
import usePokemonDetails from "../hooks/usePokemonDetails";
import "../styles/PokemonRegionList.css";
import PokemonCard from "./PokemonCard";

interface PokemonRegionListProps {
  name: string;
  pokemonRegionList: Region;
}

function PokemonRegionList({
  pokemonRegionList,
  name,
}: PokemonRegionListProps) {
  const pageSize = 15;
  const [page, setPage] = useState<number>(1);

  const { data: pokedex } = usePokedex(pokemonRegionList.pokedexes[0].name);

  const urls: string[] = [];
  const ids: string[] = [];

  pokedex?.pokemon_entries.forEach((entry) => {
    urls.push(entry.pokemon_species.url);
  });

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  const { data: pokemonDetails } = usePokemonDetails(ids, 0);

  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonDetails[]>(
    []
  );

  const loadInitialBatch = () => {
    const initialBatch = pokemonDetails?.slice(0, pageSize) || [];
    setDisplayedPokemon(initialBatch);
    setPage(1);
  };

  useEffect(() => {
    loadInitialBatch();
  }, [name]);

  const handleLoadMoreClick = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const nextBatch = pokemonDetails?.slice(startIndex, endIndex) || [];
    setDisplayedPokemon((prevDisplayedPokemon) => [
      ...prevDisplayedPokemon,
      ...nextBatch,
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h2 className="pokemon-region-heading">Pokémon from the {name} region</h2>
      <div className="pokemon-region-cards">
        {displayedPokemon.map((pokemonName, index) => (
          <PokemonCard key={index} pokemon={pokemonName} />
        ))}
      </div>
      {displayedPokemon.length < pokemonDetails?.length! && (
        <div className="pokemon-region-btn-container">
          <button
            onClick={handleLoadMoreClick}
            className="pokemon-region-btn-container__btn"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default PokemonRegionList;
