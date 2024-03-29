import { create } from "zustand";

interface LoadingStore {
  isPokemonSpeciesLoading: boolean;
  isSequentialEvolutionDetailsLoading: boolean;
  isChoiceEvolutionDetailsLoading: boolean;

  setPokemonSpeciesLoading: (loading: boolean) => void;
  setSequentialEvolutionDetailsLoading: (loading: boolean) => void;
  setChoiceEvolutionDetailsLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isPokemonSpeciesLoading: false,
  isSequentialEvolutionDetailsLoading: false,
  isChoiceEvolutionDetailsLoading: false,

  setPokemonSpeciesLoading: (loading) =>
    set(() => ({ isPokemonSpeciesLoading: loading })),
  setSequentialEvolutionDetailsLoading: (loading) =>
    set(() => ({ isSequentialEvolutionDetailsLoading: loading })),
  setChoiceEvolutionDetailsLoading: (loading) =>
    set(() => ({ isChoiceEvolutionDetailsLoading: loading })),
}));

export default useLoadingStore;
