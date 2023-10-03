import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import GenerationDetails from "../entities/GenerationDetails";

const apiClient = new APIClient<GenerationDetails>("/generation/");

function useGeneration(name: string) {
  return useQuery({
    queryKey: ["generation", name],
    queryFn: () => apiClient.get(name),
  });
}

export default useGeneration;
