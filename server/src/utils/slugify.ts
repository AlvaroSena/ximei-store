export function slugify(title: string): string {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const slugBase = normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const randomNum = Math.floor(Math.random() * 99) + 1;

  return `${slugBase}-${randomNum}`;
}
