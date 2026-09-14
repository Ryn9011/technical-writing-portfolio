import type { Project } from "@/lib/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="mb-8 max-w-3xl border-b border-slate-200 pb-24">
      <p className="mb-2 text-xs font-semibold tracking-wide text-indigo-600">{project.eyebrow}</p>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {project.title}
      </h1>
      <p className="mt-1 text-sm font-medium text-slate-500">{project.subtitle}</p>
      <p className="mt-4 text-[0.9375rem] leading-7 text-slate-600">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Documentation shown here demonstrates
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-600">
          {project.highlights.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-indigo-400" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
