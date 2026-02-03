import type { RegressionPlotResponse } from "../types/plot";

export async function getRegressionPlot(): Promise<RegressionPlotResponse> {
  const res = await fetch("/api/regression/plot");

  if (!res.ok) {
    throw new Error("Plot data not available");
  }

  return res.json();
}
