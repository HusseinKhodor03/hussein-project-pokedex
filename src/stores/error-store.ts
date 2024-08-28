import { create } from "zustand";

interface ErrorStore {
  isNaNError: boolean;
  isEmptyArrayError: boolean;
  isSearchEmptyArrayError: boolean;

  setNaNError: (error: boolean) => void;
  setIsEmptyArrayError: (error: boolean) => void;
  setIsSearchEmptyArrayError: (error: boolean) => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
  isNaNError: false,
  isEmptyArrayError: false,
  isSearchEmptyArrayError: false,

  setNaNError: (error) => set(() => ({ isNaNError: error })),
  setIsEmptyArrayError: (error) => set(() => ({ isEmptyArrayError: error })),
  setIsSearchEmptyArrayError: (error) =>
    set(() => ({ isSearchEmptyArrayError: error })),
}));

export default useErrorStore;
