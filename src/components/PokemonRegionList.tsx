import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonDetails from "../entities/PokemonDetails";
import Region from "../entities/Region";
import usePokedex from "../hooks/usePokedex";

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

  return (
    <>
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
    </>
  );
}

export default PokemonRegionList;
