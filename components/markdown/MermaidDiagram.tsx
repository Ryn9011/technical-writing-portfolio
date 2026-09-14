"use client";

import { useEffect, useId, useRef, useState } from "react";

let didInit = false;

async function ensureMermaidInitialized() {
  const mermaid = (await import("mermaid")).default;
  if (!didInit) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      fontFamily: "var(--font-geist-sans, sans-serif)",
      themeVariables: {
        primaryColor: "#eef2ff",
        primaryBorderColor: "#6366f1",
        primaryTextColor: "#1e1b4b",
        lineColor: "#94a3b8",
        secondaryColor: "#f8fafc",
        tertiaryColor: "#f1f5f9",
        fontSize: "14px",
        clusterBkg: "#f8fafc",
        clusterBorder: "#cbd5e1",
      },
    });
    didInit = true;
  }
  return mermaid;
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/[:«»]/g, "");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = await ensureMermaidInitialized();
        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart.trim());
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (status === "error") {
    return (
      <div className="not-prose my-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-medium">Diagram could not be rendered.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-amber-800">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-200 bg-white p-5">
      {status === "loading" ? (
        <div className="flex h-40 items-center justify-center text-sm text-slate-400">
          Rendering diagram…
        </div>
      ) : null}
      <div
        ref={containerRef}
        className={`mermaid-diagram flex justify-center ${status === "loading" ? "hidden" : ""}`}
      />
    </div>
  );
}
