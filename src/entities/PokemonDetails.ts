export default interface PokemonDetails {
  id: number;
  name: string;
  sprites: Sprites;
}

interface Sprites {
  front_default: string;
}
