"use client";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SyntaxHighlighter, SUPPORTED_LANGUAGES } from "./prism";
import { CopyButton } from "./CopyButton";

const LANGUAGE_LABELS: Record<string, string> = {
  csharp: "C#",
  json: "JSON",
  sql: "SQL",
  markdown: "Markdown",
  bash: "Shell",
  yaml: "YAML",
  typescript: "TypeScript",
};

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const trimmed = code.replace(/\n$/, "");
  const known = SUPPORTED_LANGUAGES.has(language);
  const label = LANGUAGE_LABELS[language] ?? (language ? language.toUpperCase() : "Text");

  return (
    <div className="not-prose my-5 overflow-hidden rounded-lg border border-slate-800 bg-[#1e1e1e] shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2">
        <span className="text-xs font-medium tracking-wide text-slate-400">{label}</span>
        <CopyButton text={trimmed} />
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={known ? language : "text"}
          style={vscDarkPlus}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: 1.65,
          }}
          codeTagProps={{ style: { fontFamily: "var(--font-geist-mono, monospace)" } }}
        >
          {trimmed}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
