export default interface Pokedexes {
  pokemon_entries: PokemonEntry[];
}

interface PokemonEntry {
  pokemon_species: {
    url: string;
  };
}
