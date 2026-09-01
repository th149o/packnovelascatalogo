/**
 * Gera um slug padronizado, sem acentos, caracteres especiais ou espaços.
 * Compatível tanto com Client Components quanto com Server Components.
 * Exemplo: "Só Mais Uma Vez" -> "so-mais-uma-vez"
 */
export function generateSlug(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Normaliza strings para comparação robusta entre nomes de arquivos e títulos.
 */
export function normalizeForMatch(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^ep_/, "")
    .replace(/^dublado_/, "")
    .replace(/\.txt$/, "")
    .replace(/\.jpe?g$/, "")
    .replace(/\.png$/, "")
    .replace(/\.webp$/, "")
    .replace(/[^a-z0-9]/g, "");
}

