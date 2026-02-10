const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";
const base = rawBase.replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
