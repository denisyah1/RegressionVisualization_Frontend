import type { RecommendationResponse } from "../types/recommendation";
import { apiUrl } from "./base";

export async function getRecommendation(file: File): Promise<RecommendationResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(apiUrl("/api/csv/recommendation"), {
    method: "POST",
    body: form
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendation");
  }

  return res.json();
}
