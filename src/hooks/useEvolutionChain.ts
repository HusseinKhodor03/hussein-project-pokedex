import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import EvolutionChain from "../entities/EvolutionChain";

const apiClient = new APIClient<EvolutionChain>("/evolution-chain/");

function useEvolutionChain(id: number) {
  return useQuery({
    queryKey: ["evolution-chain", id],
    queryFn: () => apiClient.get(id),
  });
}

export default useEvolutionChain;
