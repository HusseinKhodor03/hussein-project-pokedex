import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import PokemonDetails from "../entities/PokemonDetails";

function usePokemonDetails(names: string[]) {
  const pokemonDetailService = new APIClient<PokemonDetails>(
    "/pokemon/",
    names
  );

  return useQuery({
    queryKey: ["pokemon-details", names],
    queryFn: pokemonDetailService.getPokemonDetails,
  });
}

export default usePokemonDetails;
