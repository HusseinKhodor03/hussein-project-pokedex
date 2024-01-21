import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import PokemonSpecies from "../entities/PokemonSpecies";

const apiClient = new APIClient<PokemonSpecies>("/pokemon-species/");

function usePokemonSpecies(name: string) {
  return useQuery({
    queryKey: ["pokemon-species", name],
    queryFn: () => apiClient.get(name),
  });
}

export default usePokemonSpecies;
