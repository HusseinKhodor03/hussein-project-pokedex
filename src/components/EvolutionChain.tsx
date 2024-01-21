import PokemonDetails from "../entities/PokemonDetails";
import useEvolutionChain from "../hooks/useEvolutionChain";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import LoadingSpinner from "./LoadingSpinner";
import PokemonCard from "./PokemonCard";
import rightArrow from "../assets/right-arrow.svg";

interface EvolutionChainProps {
  pokemon: PokemonDetails;
}

function EvolutionChain({ pokemon }: EvolutionChainProps) {
  const { data: pokemonSpecies, isLoading: isPokemonSpeciesLoading } =
    usePokemonSpecies(pokemon.name);
  const evolutionChainID = parseInt(
    pokemonSpecies?.evolution_chain.url.split("/").slice(-2, -1)[0]!
  );

  const { data: evolutionChain } = useEvolutionChain(evolutionChainID);

  const baseEvolution = evolutionChain?.chain.species.url;
  const firstEvolution = evolutionChain?.chain.evolves_to?.[0]?.species.url;
  const secondEvolution =
    evolutionChain?.chain.evolves_to?.[0]?.evolves_to?.[0]?.species.url;

  let evolutionListURLs: string[] = [];

  if (baseEvolution) {
    evolutionListURLs.push(baseEvolution);
  }

  if (firstEvolution) {
    evolutionListURLs.push(firstEvolution);
  }

  if (secondEvolution) {
    evolutionListURLs.push(secondEvolution);
  }

  const IDs: string[] = [];

  evolutionListURLs.forEach((url) => {
    const parts = url.split("/");
    IDs.push(parts[parts.length - 2]);
  });

  const { data: evolutionDetails, isLoading: isEvolutionDetailsLoading } =
    usePokemonDetails(IDs, 0);
  let evolutionList: { pokemon_name: string; sprite: string }[] = [];

  if (!pokemonSpecies) {
    evolutionList = [
      { pokemon_name: pokemon.name, sprite: pokemon.sprites.front_default },
    ];
  } else {
    if (baseEvolution) {
      evolutionList.push({
        pokemon_name: evolutionDetails?.[0].name!,
        sprite: evolutionDetails?.[0].sprites.front_default!,
      });
    }
    if (firstEvolution) {
      evolutionList.push({
        pokemon_name: evolutionDetails?.[1].name!,
        sprite: evolutionDetails?.[1].sprites.front_default!,
      });
    }
    if (secondEvolution) {
      evolutionList.push({
        pokemon_name: evolutionDetails?.[2].name!,
        sprite: evolutionDetails?.[2].sprites.front_default!,
      });
    }
  }

  if (isPokemonSpeciesLoading || isEvolutionDetailsLoading)
    return <LoadingSpinner />;

  return (
    <>
      {evolutionList.map((evolution, index) => (
        <>
          <PokemonCard
            key={index}
            isCurrentPokemon={pokemon.name === evolution.pokemon_name}
            pokemon={{
              name: evolution.pokemon_name,
              sprites: { front_default: evolution.sprite },
            }}
          />
          {index < evolutionList.length - 1 && (
            <img className="right-arrow-icon" src={rightArrow} />
          )}
        </>
      ))}
    </>
  );
}

export default EvolutionChain;
