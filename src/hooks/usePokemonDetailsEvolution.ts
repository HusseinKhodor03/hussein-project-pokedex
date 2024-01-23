import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import PokemonDetails from "../entities/PokemonDetails";

const apiClient = new APIClient<PokemonDetails>("/pokemon/");

function usePokemonDetailsEvolution(paths: string[][]) {
  return useQuery({
    queryKey: ["pokemon-details-evolution", paths],
    queryFn: () => apiClient.getPokemonDetailsEvolution(paths),
  });
}

export default usePokemonDetailsEvolution;
