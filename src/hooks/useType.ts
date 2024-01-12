import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Type from "../entities/Type";

const apiClient = new APIClient<Type>("/type/");

function useType(name: string) {
  return useQuery({
    queryKey: ["type", name],
    queryFn: () => apiClient.get(name),
  });
}

export default useType;
