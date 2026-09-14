import { technicalProjects, endUserProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-work-heading" className="border-t border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Featured work
            </p>
            <h2
              id="featured-work-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              Documentation from real software projects
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Technical documentation based on real software projects and code, covering both engineering and end-user audiences. Each sample includes the rendered documentation alongside its Markdown source, with selected implementation code included where appropriate.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {technicalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              End-user documentation
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Guides written for customers, not engineers
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Plain-language, task-focused guides written for the people using the product day to
              day, rather than the engineers building it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {endUserProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
