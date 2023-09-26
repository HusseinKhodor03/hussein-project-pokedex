import axios, { AxiosRequestConfig } from "axios";
import PokemonDetails from "../entities/PokemonDetails";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

class APIClient<T> {
  endpoint: string;
  names?: string[];

  constructor(endpoint: string, names?: string[]) {
    this.endpoint = endpoint;
    this.names = names;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((response) => response.data);
  };

  getPokemonDetails = (config: AxiosRequestConfig) => {
    const requests: Promise<PokemonDetails>[] = [];

    if (!this.names) return Promise.resolve([]);

    this.names?.forEach((name) => {
      requests.push(
        axiosInstance
          .get<PokemonDetails>(this.endpoint + name, config)
          .then((response) => response.data)
      );
    });

    return Promise.all(requests);
  };
}

export default APIClient;
