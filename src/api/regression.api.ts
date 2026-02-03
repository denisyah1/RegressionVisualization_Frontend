import type { RegressionPlotResponse } from "../types/plot";
import type { RegressionResponse } from "../types/regression";

export async function runRegression(
  file: File,
  target: string,
  features: string[],
  nullStrategy: "mean" | "drop"
): Promise<RegressionResponse> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("target_column", target);
  fd.append("feature_columns", features.join(","));
  fd.append("null_strategy", nullStrategy);

  const res = await fetch("/api/regression", {
    method: "POST",
    body: fd
  });

  if (!res.ok) {
    throw new Error("Regression failed");
  }

  return res.json();
}

export async function getRegressionPlot(): Promise<RegressionPlotResponse> {
  const res = await fetch("/api/regression/plot");

  if (!res.ok) {
    throw new Error("Plot data not available");
  }

  return res.json();
}
