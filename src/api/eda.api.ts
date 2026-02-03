import type { EdaResponse } from "../types/eda";

export async function runEda(file: File): Promise<EdaResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/csv/eda", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("EDA analysis failed");
  }

  return res.json();
}
