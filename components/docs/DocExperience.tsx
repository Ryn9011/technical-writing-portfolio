"use client";

import { useState, type ReactNode } from "react";
import { Code2, FileText, LayoutList } from "lucide-react";
import type { TocHeading } from "@/lib/markdown";
import { TableOfContents } from "./TableOfContents";

export interface DocTab {
  id: string;
  label: string;
  icon?: "doc" | "markdown" | "code";
  content: ReactNode;
}

const ICONS = {
  doc: LayoutList,
  markdown: FileText,
  code: Code2,
};

export function DocExperience({ tabs, toc }: { tabs: DocTab[]; toc: TocHeading[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const activeIndex = tabs.findIndex((t) => t.id === active);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(activeIndex + dir + tabs.length) % tabs.length];
    setActive(next.id);
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-10">
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Documentation view"
          onKeyDown={handleKeyDown}
          className="mb-6 flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon ? ICONS[tab.icon] : null;
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
                {tab.label}
              </button>
            );
          })}
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== active}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <aside className="hidden lg:block">
        {active === tabs[0].id ? (
          <div className="sticky top-24">
            <TableOfContents headings={toc} />
          </div>
        ) : null}
      </aside>
    </div>
  );
}
