import PokemonDetails from "../entities/PokemonDetails";
import useEvolutionChain from "../hooks/useEvolutionChain";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import PokemonCard from "./PokemonCard";
import rightArrow from "../assets/right-arrow.svg";
import usePokemonDetailsEvolution from "../hooks/usePokemonDetailsEvolution";
import "../styles/EvolutionChain.css";

interface EvolutionChainProps {
  pokemon: PokemonDetails;
}

function EvolutionChain({ pokemon }: EvolutionChainProps) {
  const { data: pokemonSpecies } = usePokemonSpecies(pokemon.name);
  const evolutionChainID = parseInt(
    pokemonSpecies?.evolution_chain.url.split("/").slice(-2, -1)[0]!
  );

  const { data: evolutionChain } = useEvolutionChain(evolutionChainID);

  const baseEvolution = evolutionChain?.chain.species.url;
  const evolvesTo = evolutionChain?.chain.evolves_to;
  const sequentialEvolutions: string[] = [];
  const choiceEvolutions: string[][] = [];

  let currentEvolvesTo = evolvesTo;

  while (currentEvolvesTo?.length === 1) {
    let { species, evolves_to } = currentEvolvesTo[0];
    sequentialEvolutions.push(species.url);
    currentEvolvesTo = evolves_to;
  }

  if (currentEvolvesTo && currentEvolvesTo.length >= 2) {
    currentEvolvesTo.forEach((evolution) => {
      const choiceEvolutionPath: string[] = [];
      let currentChoice = evolution;

      while (
        currentChoice.evolves_to &&
        currentChoice.evolves_to.length === 1
      ) {
        choiceEvolutionPath.push(currentChoice.species.url);
        currentChoice = currentChoice.evolves_to[0];
      }

      choiceEvolutionPath.push(currentChoice.species.url);
      choiceEvolutions.push(choiceEvolutionPath);
    });
  }

  if (baseEvolution) {
    sequentialEvolutions.unshift(baseEvolution);
  }

  let sequentialEvolutionURLs: string[] = [];
  let choiceEvolutionsURLs: string[][] = [];

  sequentialEvolutions.forEach((url) => {
    sequentialEvolutionURLs.push(url);
  });

  choiceEvolutions.forEach((evolutionPath) => {
    const choiceEvolutionURLs: string[] = [];
    evolutionPath.forEach((url) => {
      choiceEvolutionURLs.push(url);
    });
    choiceEvolutionsURLs.push(choiceEvolutionURLs);
  });

  const sequentialEvolutionIDs: string[] = [];
  const choiceEvolutionIDs: string[][] = [];

  sequentialEvolutionURLs.forEach((url) => {
    const parts = url.split("/");
    sequentialEvolutionIDs.push(parts[parts.length - 2]);
  });

  choiceEvolutionsURLs.forEach((evolutionPath) => {
    const choiceEvolutionPathIDs: string[] = [];
    evolutionPath.forEach((url) => {
      const parts = url.split("/");
      choiceEvolutionPathIDs.push(parts[parts.length - 2]);
    });
    choiceEvolutionIDs.push(choiceEvolutionPathIDs);
  });

  const { data: sequentialEvolutionDetails } = usePokemonDetails(
    sequentialEvolutionIDs,
    0
  );

  let { data: choiceEvolutionDetails } =
    usePokemonDetailsEvolution(choiceEvolutionIDs);

  if (choiceEvolutionDetails && sequentialEvolutionDetails) {
    choiceEvolutionDetails = choiceEvolutionDetails.map((evolutionPath) => [
      ...sequentialEvolutionDetails,
      ...evolutionPath,
    ]);
  }

  return (
    <>
      <h3 className="evolution-chain-heading">Evolution Chain</h3>
      {!pokemonSpecies ? (
        <div className="no-pokemon-species">
          <PokemonCard isCurrentPokemon={true} pokemon={pokemon} />
        </div>
      ) : (
        <>
          {choiceEvolutionDetails &&
            choiceEvolutionDetails.map((evolutionPath, index) => (
              <>
                <h3 className="evolution-choices-title">
                  Evolution Chain #{index + 1}
                </h3>
                <div key={index} className="evolution-choices">
                  {evolutionPath.map((evolution, index) => (
                    <>
                      <PokemonCard
                        key={evolution.id}
                        isCurrentPokemon={pokemon.id === evolution.id}
                        pokemon={evolution}
                      />
                      {index < evolutionPath.length - 1 && (
                        <img
                          className="right-arrow-icon"
                          src={rightArrow}
                        ></img>
                      )}
                    </>
                  ))}
                </div>
              </>
            ))}
          <section className="evolution-sequential">
            {sequentialEvolutionDetails &&
              !choiceEvolutionDetails?.some((evolutionPath) =>
                evolutionPath.some((evolution) =>
                  sequentialEvolutionDetails.some(
                    (sequentialEvolution) =>
                      sequentialEvolution.id === evolution.id
                  )
                )
              ) &&
              sequentialEvolutionDetails.map((evolution, index) => (
                <>
                  <PokemonCard
                    isCurrentPokemon={pokemon.id === evolution.id}
                    pokemon={evolution}
                  />
                  {index < sequentialEvolutionDetails.length - 1 && (
                    <img className="right-arrow-icon" src={rightArrow}></img>
                  )}
                </>
              ))}
          </section>
        </>
      )}
    </>
  );
}

export default EvolutionChain;
