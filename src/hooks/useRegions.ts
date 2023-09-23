import { useQuery } from "@tanstack/react-query";
import Regions from "../entities/Regions";
import APIClient from "../services/api-client";

const regionService = new APIClient<Regions>("/region/");

function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: regionService.getAll,
  });
}

export default useRegions;
