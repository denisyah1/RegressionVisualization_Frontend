export function downloadModel(filename: string) {
  const url = `/api/model/download?filename=${encodeURIComponent(filename)}`;
  window.open(url, "_blank");
}
