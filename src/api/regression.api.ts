import type { RegressionResponse } from "../types/regression";

export async function runRegression(params: {
  file: File;
  target: string;
  features: string[];
  nullStrategy: "drop" | "mean" | "auto";
}): Promise<RegressionResponse> {
  const fd = new FormData();
  fd.append("file", params.file);
  fd.append("target_column", params.target);
  fd.append("feature_columns", params.features.join(","));
  fd.append("null_strategy", params.nullStrategy);

  const res = await fetch("/api/regression", {
    method: "POST",
    body: fd
  });

  if (!res.ok) {
    throw new Error("Regression failed");
  }

  return res.json();
}
