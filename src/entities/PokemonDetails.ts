export default interface PokemonDetails {
  id?: number;
  name: string;
  height?: number;
  weight?: number;
  sprites: Sprites;
  abilities?: Ability[];
  types?: Type[];
  stats?: Stat[];
}

interface Sprites {
  front_default: string;
  front_shiny?: string;
}

interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
