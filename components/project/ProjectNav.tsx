import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { technicalProjects, endUserProjects } from "@/lib/projects";

function ProjectGroup({
  label,
  items,
  activeSlug,
}: {
  label: string;
  items: typeof technicalProjects;
  activeSlug: string;
}) {
  return (
    <>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <ul className="space-y-1">
        {items.map((project) => {
          const isActive = project.slug === activeSlug;
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`block rounded-md border-l-2 px-3 py-2 leading-snug transition-colors ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="block text-[13px] font-medium">{project.title}</span>
                <span className="block text-xs text-slate-400">{project.subtitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function ProjectNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Project navigation" className="text-sm">
      <Link
        href="/work"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        All work
      </Link>

      <div className="mb-6">
        <ProjectGroup label="Technical documentation" items={technicalProjects} activeSlug={activeSlug} />
      </div>

      <div>
        <ProjectGroup label="End-user documentation" items={endUserProjects} activeSlug={activeSlug} />
      </div>
    </nav>
  );
}
