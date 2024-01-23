export default interface EvolutionChain {
  chain: {
    evolves_to: EvolutionNode[];
    species: {
      name: string;
      url: string;
    };
  };
}

interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}
