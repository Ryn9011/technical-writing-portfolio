import type { Metadata } from "next";
import { technicalProjects, endUserProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/home/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Documentation samples covering system architecture, a HubSpot CRM integration (engineering and end-user guides), and a developer API, drawn from real software projects.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Work</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Documentation samples
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-7 text-slate-600">
          Technical documentation for software systems I designed and built, covering architecture, integrations and APIs. The samples come from a multi-tenant SaaS platform and include system architecture documentation, a HubSpot CRM integration and a REST API. Each includes the rendered documentation alongside its Markdown source, with the API documentation also paired with the actual controller implementation it describes.
        </p>
      </div>

      <div className="mt-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Technical documentation
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Guides written for engineers
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-7 text-slate-600">
          Architecture references, integration guides and API documentation written for the
          engineers building and maintaining the system.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {technicalProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-16 max-w-2xl border-t border-slate-200 pt-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          End-user documentation
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Guides written for end users
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-7 text-slate-600">
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
  );
}
