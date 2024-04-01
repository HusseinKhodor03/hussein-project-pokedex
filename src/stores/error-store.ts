import { create } from "zustand";

interface ErrorStore {
  isNaNError: boolean;
  isEmptyArrayError: boolean;

  setNaNError: (error: boolean) => void;
  setIsEmptyArrayError: (error: boolean) => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
  isNaNError: false,
  isEmptyArrayError: false,

  setNaNError: (error) => set(() => ({ isNaNError: error })),
  setIsEmptyArrayError: (error) => set(() => ({ isEmptyArrayError: error })),
}));

export default useErrorStore;
