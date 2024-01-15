import { create } from "zustand";

interface ErrorStore {
  isPokemonDetailError: boolean;
  isGenerationError: boolean;
  isTypeError: boolean;
  isRegionError: boolean;
  isNaNError: boolean;

  setPokemonDetailError: (error: boolean) => void;
  setGenerationError: (error: boolean) => void;
  setTypeError: (error: boolean) => void;
  setRegionError: (error: boolean) => void;
  setNaNError: (error: boolean) => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
  isPokemonDetailError: false,
  isGenerationError: false,
  isTypeError: false,
  isRegionError: false,
  isNaNError: false,

  setPokemonDetailError: (error) =>
    set(() => ({ isPokemonDetailError: error })),
  setGenerationError: (error) => set(() => ({ isGenerationError: error })),
  setTypeError: (error) => set(() => ({ isTypeError: error })),
  setRegionError: (error) => set(() => ({ isRegionError: error })),
  setNaNError: (error) => set(() => ({ isNaNError: error })),
}));

export default useErrorStore;
