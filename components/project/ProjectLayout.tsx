import type { ReactNode } from "react";
import { ProjectNav } from "./ProjectNav";
import { ProjectMobileNav } from "./ProjectMobileNav";

export function ProjectLayout({
  activeSlug,
  children,
}: {
  activeSlug: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProjectNav activeSlug={activeSlug} />
          </div>
        </aside>
        <div className="min-w-0">
          <ProjectMobileNav activeSlug={activeSlug} />
          {children}
        </div>
      </div>
    </div>
  );
}
