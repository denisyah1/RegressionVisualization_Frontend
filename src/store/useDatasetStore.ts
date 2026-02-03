import { create } from "zustand";
import type { EdaResponse } from "../types/eda";

interface DatasetState {
  file: File | null;
  eda: EdaResponse | null;
  loading: boolean;
  error: string | null;

  setFile: (file: File) => void;
  setEda: (eda: EdaResponse) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

export const useDatasetStore = create<DatasetState>(set => ({
  file: null,
  eda: null,
  loading: false,
  error: null,

  setFile: file => set({ file }),
  setEda: eda => set({ eda }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),

  reset: () =>
    set({
      file: null,
      eda: null,
      loading: false,
      error: null
    })
}));
