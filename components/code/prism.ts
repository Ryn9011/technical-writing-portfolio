import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";

SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("typescript", typescript);

export { SyntaxHighlighter };

/** Languages we ship highlighting grammars for. Anything else falls back to plain text. */
export const SUPPORTED_LANGUAGES = new Set([
  "csharp",
  "json",
  "sql",
  "markdown",
  "bash",
  "yaml",
  "typescript",
]);

export function normalizeLanguage(lang?: string): string {
  const value = (lang ?? "").toLowerCase().trim();
  if (value === "cs") return "csharp";
  if (value === "md") return "markdown";
  if (value === "sh" || value === "shell") return "bash";
  if (value === "ts" || value === "tsx") return "typescript";
  return value;
}
