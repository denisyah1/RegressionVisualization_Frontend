import { apiUrl } from "./base";

export function downloadModel(filename: string) {
  const url = apiUrl(
    `/api/model/download?filename=${encodeURIComponent(filename)}`
  );
  window.open(url, "_blank");
}
