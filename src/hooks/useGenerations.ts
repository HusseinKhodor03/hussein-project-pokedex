import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Generations from "../entities/Generations";

const generationService = new APIClient<Generations>("/generation/");

function useGenerations() {
  return useQuery({
    queryKey: ["generations"],
    queryFn: generationService.getAll,
  });
}

export default useGenerations;
