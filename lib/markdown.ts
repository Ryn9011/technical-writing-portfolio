import GithubSlugger from "github-slugger";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts heading ids/text from raw markdown using the same slug algorithm
 * as rehype-slug (github-slugger), so anchors generated here match the ids
 * rehype-slug assigns when the markdown is actually rendered.
 *
 * Only level 2/3 headings are returned for the table of contents, but every
 * heading (including h1) is fed through the slugger in document order so the
 * de-duplication counter stays in sync with the real render.
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");
  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/[`*_]/g, "").trim();
    const id = slugger.slug(text);

    if (level === 2 || level === 3) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}
