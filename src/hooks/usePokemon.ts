import { useQuery } from "@tanstack/react-query";
import Pokemon from "../entities/Pokemon";
import APIClient from "../services/api-client";

function usePokemon(offset: number, limit: number) {
  const pokemonService = new APIClient<Pokemon>("/pokemon/");

  return useQuery({
    queryKey: ["pokemon", offset],
    queryFn: () =>
      pokemonService.getAll({
        params: {
          limit: limit,
          offset: offset,
        },
      }),
  });
}

export default usePokemon;
