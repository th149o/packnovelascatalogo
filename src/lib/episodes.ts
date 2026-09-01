import fs from "fs";
import path from "path";
import { CATALOG_NOVELS, CatalogNovel } from "@/data/catalog";
import { generateSlug, normalizeForMatch } from "@/lib/slug";

export { generateSlug, normalizeForMatch };

export interface Episode {
  episode: number;
  url: string;
}

export interface NovelWithEpisodes {
  novela: CatalogNovel;
  slug: string;
  episodes: Episode[];
  totalEpisodes: number;
}

// Cache em memória para evitar releituras desnecessárias de disco
const episodesCache = new Map<string, Episode[]>();

/**
 * Lê e interpreta o arquivo .txt de episódios da pasta /episodios
 */
export function parseEpisodesFile(filename: string): Episode[] {
  if (episodesCache.has(filename)) {
    return episodesCache.get(filename)!;
  }

  const episodiosDir = path.join(process.cwd(), "episodios");
  const filePath = path.join(episodiosDir, filename);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    const episodes: Episode[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Padrões como: "Episódio 1: https://..." ou "Episodio 1: https://..." ou "Ep 1: https://..."
      const match = trimmed.match(/^(?:epis[oó]dio|ep)\s*(\d+)\s*:\s*(https?:\/\/[^\s]+)/i);
      if (match) {
        const episodeNum = parseInt(match[1], 10);
        const url = match[2].trim();

        if (!isNaN(episodeNum) && url) {
          episodes.push({
            episode: episodeNum,
            url,
          });
        }
      }
    }

    // Ordenação numérica estrita em ordem crescente
    episodes.sort((a, b) => a.episode - b.episode);

    // Salva no cache em memória
    episodesCache.set(filename, episodes);
    return episodes;
  } catch (error) {
    console.error(`Erro ao ler arquivo de episódios ${filename}:`, error);
    return [];
  }
}

/**
 * Encontra o arquivo .txt correspondente a uma novela na pasta /episodios
 */
export function findEpisodeFileForNovel(novel: CatalogNovel): string | null {
  const episodiosDir = path.join(process.cwd(), "episodios");
  if (!fs.existsSync(episodiosDir)) return null;

  const files = fs.readdirSync(episodiosDir).filter((f) => f.endsWith(".txt"));

  const normalizedTitle = normalizeForMatch(novel.title);
  const normalizedFilename = normalizeForMatch(novel.filename);

  // 1. Correspondência exata normalizada
  for (const file of files) {
    const normalizedFile = normalizeForMatch(file);
    if (
      normalizedFile === normalizedTitle ||
      normalizedFile === normalizedFilename ||
      normalizedFile === `ep${normalizedTitle}` ||
      normalizedFile === `ep${normalizedFilename}`
    ) {
      return file;
    }
  }

  // 2. Correspondência parcial / inclusão
  for (const file of files) {
    const normalizedFile = normalizeForMatch(file);
    if (
      normalizedFile.includes(normalizedTitle) ||
      normalizedTitle.includes(normalizedFile)
    ) {
      return file;
    }
  }

  // 3. Correspondência por palavras-chave principais do slug
  const slug = generateSlug(novel.title);
  const keywords = slug.split("-").filter((w) => w.length > 2);
  for (const file of files) {
    const normalizedFile = normalizeForMatch(file);
    const matchCount = keywords.filter((kw) => normalizedFile.includes(kw)).length;
    if (matchCount >= Math.min(2, keywords.length)) {
      return file;
    }
  }

  return null;
}

/**
 * Retorna os dados completos da novela e sua lista ordenada de episódios pelo slug.
 */
export function getNovelDataBySlug(slug: string): NovelWithEpisodes | null {
  const novel = CATALOG_NOVELS.find((n) => generateSlug(n.title) === slug);
  if (!novel) return null;

  const episodeFile = findEpisodeFileForNovel(novel);
  const episodes = episodeFile ? parseEpisodesFile(episodeFile) : [];

  return {
    novela: novel,
    slug: generateSlug(novel.title),
    episodes,
    totalEpisodes: episodes.length,
  };
}

/**
 * Retorna todas as novelas com seus respectivos slugs.
 */
export function getAllNovelsWithSlugs(): Array<CatalogNovel & { slug: string }> {
  return CATALOG_NOVELS.map((n) => ({
    ...n,
    slug: generateSlug(n.title),
  }));
}

