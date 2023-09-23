import { useQuery } from "@tanstack/react-query";
import Types from "../entities/Types";
import APIClient from "../services/api-client";

const typeService = new APIClient<Types>("/type/");

function useTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: typeService.getAll,
  });
}

export default useTypes;
