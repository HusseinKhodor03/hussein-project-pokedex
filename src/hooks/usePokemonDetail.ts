import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import PokemonDetails from "../entities/PokemonDetails";

const apiClient = new APIClient<PokemonDetails>("/pokemon/");

function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => apiClient.get(name),
  });
}

export default usePokemonDetail;
