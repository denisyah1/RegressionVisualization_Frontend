import { create } from "zustand";
import type { RegressionResponse } from "../types/regression";

interface RegressionState {
  target: string;
  features: string[];
  nullStrategy: "drop" | "mean";
  result: RegressionResponse | null;
  loading: boolean;
  error: string | null;

  setTarget: (v: string) => void;
  setFeatures: (v: string[]) => void;
  setNullStrategy: (v: "drop" | "mean") => void;
  setResult: (r: RegressionResponse | null) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;

  /** 🔥 NEW */
  applyRecommendation: (target: string | null, features: string[]) => void;

  reset: () => void;
}

export const useRegressionStore = create<RegressionState>(set => ({
  target: "",
  features: [],
  nullStrategy: "drop",
  result: null,
  loading: false,
  error: null,

  setTarget: target => set({ target }),
  setFeatures: features => set({ features }),
  setNullStrategy: nullStrategy => set({ nullStrategy }),
  setResult: result => set({ result }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),

  /** ✅ APPLY RECOMMENDATION */
  applyRecommendation: (target, features) =>
    set({
      target: target ?? "",
      features,
      result: null,
      error: null
    }),

  reset: () =>
    set({
      target: "",
      features: [],
      nullStrategy: "drop",
      result: null,
      loading: false,
      error: null
    })
}));
