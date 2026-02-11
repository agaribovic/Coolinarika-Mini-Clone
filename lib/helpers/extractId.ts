export function extractId(slugAndId: string): string | null {
  const parts = slugAndId.split("-");
  const id = parts[parts.length - 1];

  if (!id || id.length < 10) return null;

  return id;
}
