interface Pokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

export default interface Type {
  pokemon: Pokemon[];
}
