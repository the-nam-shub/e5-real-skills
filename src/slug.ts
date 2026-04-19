export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function episodeUrlFromTitle(baseUrl: string, title: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  return `${base}/${slugify(title)}`;
}
