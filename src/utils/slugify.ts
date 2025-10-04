// src/utils/slugify.ts

export function slugify(name: string): string {
  if (name === ".") return name;
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
