import type { RegressionPlotResponse } from "../types/plot";
import { apiUrl } from "./base";

export async function getRegressionPlot(): Promise<RegressionPlotResponse> {
  const res = await fetch(apiUrl("/api/regression/plot"));

  if (!res.ok) {
    throw new Error("Plot data not available");
  }

  return res.json();
}
