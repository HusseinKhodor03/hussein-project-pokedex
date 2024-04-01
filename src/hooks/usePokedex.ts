import { useQuery } from "@tanstack/react-query";
import Pokedexes from "../entities/Pokedexes";
import APIClient from "../services/api-client";

const pokedexService = new APIClient<Pokedexes>("/pokedex/");

function usePokedex(name: string) {
  return useQuery({
    queryKey: ["pokedex", name],
    queryFn: () => pokedexService.get(name),
  });
}

export default usePokedex;
