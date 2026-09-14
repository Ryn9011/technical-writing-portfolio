import type { Metadata } from "next";
import { getCodeSource, getDocSource } from "@/lib/content";
import { extractHeadings } from "@/lib/markdown";
import { getProject } from "@/lib/projects";
import { ProjectLayout } from "@/components/project/ProjectLayout";
import { ProjectHero } from "@/components/project/ProjectHero";
import { DocExperience, type DocTab } from "@/components/docs/DocExperience";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { SourceViewer } from "@/components/code/SourceViewer";

const project = getProject("invitation-api")!;

export const metadata: Metadata = {
  title: `${project.title} — ${project.subtitle}`,
  description: project.description,
};

export default async function InvitationApiPage() {
  const [markdown, controllerSource] = await Promise.all([
    getDocSource(project.doc.file),
    getCodeSource(project.code!.file),
  ]);
  const toc = extractHeadings(markdown);

  const tabs: DocTab[] = [
    {
      id: "rendered",
      label: "Documentation",
      icon: "doc",
      content: <MarkdownRenderer content={markdown} />,
    },
    {
      id: "markdown",
      label: "Markdown source",
      icon: "markdown",
      content: (
        <SourceViewer
          code={markdown}
          language="markdown"
          filename={project.doc.displayName}
          note="Read-only · rendered above"
        />
      ),
    },
    {
      id: "code",
      label: project.code!.displayName,
      icon: "code",
      content: (
        <SourceViewer
          code={controllerSource}
          language={project.code!.language}
          filename={project.code!.displayName}
          note="Real implementation · unmodified"
        />
      ),
    },
  ];

  return (
    <ProjectLayout activeSlug={project.slug}>
      <ProjectHero project={project} />
      <p className="-mt-2 mb-8 max-w-3xl rounded-lg border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm leading-6 text-indigo-900">
        The <span className="font-medium">Documentation</span> tab describes the API as written
        for consumers of it. The{" "}
        <span className="font-mono text-[0.85em]">{project.code!.displayName}</span> tab is the
        real, unmodified ASP.NET Core controller that implements it, so you can see how each
        documented endpoint, role check and error response traces back to actual code.
      </p>
      <DocExperience tabs={tabs} toc={toc} />
    </ProjectLayout>
  );
}
