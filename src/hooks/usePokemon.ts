import { useQuery } from "@tanstack/react-query";
import Pokemon from "../entities/Pokemon";
import APIClient from "../services/api-client";

function usePokemon() {
  const pokemonService = new APIClient<Pokemon>("/pokemon/");

  return useQuery({
    queryKey: ["pokemon"],
    queryFn: pokemonService.getAll,
  });
}

export default usePokemon;
