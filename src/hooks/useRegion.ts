import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Region from "../entities/Region";

const apiClient = new APIClient<Region>("/region/");

function useRegion(name: string) {
  return useQuery({
    queryKey: ["region", name],
    queryFn: () => apiClient.get(name),
  });
}

export default useRegion;
