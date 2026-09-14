"use client";

import { useRouter } from "next/navigation";
import { technicalProjects, endUserProjects } from "@/lib/projects";

export function ProjectMobileNav({ activeSlug }: { activeSlug: string }) {
  const router = useRouter();

  return (
    <div className="mb-6 lg:hidden">
      <label htmlFor="project-switch" className="mb-1.5 block text-xs font-medium text-slate-500">
        Documentation sample
      </label>
      <select
        id="project-switch"
        value={activeSlug}
        onChange={(event) => router.push(`/work/${event.target.value}`)}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <optgroup label="Technical documentation">
          {technicalProjects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.title} · {project.subtitle}
            </option>
          ))}
        </optgroup>
        <optgroup label="End-user documentation">
          {endUserProjects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.title} · {project.subtitle}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
