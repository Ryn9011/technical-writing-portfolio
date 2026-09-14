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

interface SourceViewerProps {
  code: string;
  language: string;
  filename: string;
  /** Short note shown next to the filename, e.g. "Read-only · unmodified source" */
  note?: string;
}

export function SourceViewer({ code, language, filename, note }: SourceViewerProps) {
  const known = SUPPORTED_LANGUAGES.has(language);
  const label = LANGUAGE_LABELS[language] ?? (language ? language.toUpperCase() : "Text");

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#1e1e1e] shadow-sm">
      <div className="sticky top-[3.75rem] z-10 flex items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 lg:top-[4.75rem]">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-5 shrink-0 items-center rounded border border-slate-700 bg-slate-800 px-1.5 text-[10px] font-semibold tracking-wide text-slate-300">
            {label}
          </span>
          <span className="truncate font-mono text-sm text-slate-200">{filename}</span>
          {note ? (
            <span className="hidden truncate text-xs text-slate-500 sm:inline">{note}</span>
          ) : null}
        </div>
        <CopyButton text={code} label="Copy file" />
      </div>
      <div className="max-h-[75vh] overflow-auto">
        <SyntaxHighlighter
          language={known ? language : "text"}
          style={vscDarkPlus}
          PreTag="div"
          showLineNumbers
          lineNumberContainerStyle={{ opacity: 0.5 }}
          customStyle={{
            margin: 0,
            padding: "1rem 0",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            minHeight: "100%",
          }}
          lineNumberStyle={{
            minWidth: "3.25em",
            paddingRight: "1em",
            color: "#5b6270",
            userSelect: "none",
          }}
          codeTagProps={{ style: { fontFamily: "var(--font-geist-mono, monospace)" } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
