import type { Metadata } from "next";
import { getDocSource } from "@/lib/content";
import { extractHeadings } from "@/lib/markdown";
import { getProject } from "@/lib/projects";
import { ProjectLayout } from "@/components/project/ProjectLayout";
import { ProjectHero } from "@/components/project/ProjectHero";
import { DocExperience, type DocTab } from "@/components/docs/DocExperience";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { SourceViewer } from "@/components/code/SourceViewer";

const project = getProject("hubspot-integration")!;

export const metadata: Metadata = {
  title: `${project.title} — ${project.subtitle}`,
  description: project.description,
};

export default async function HubSpotIntegrationPage() {
  const markdown = await getDocSource(project.doc.file);
  const toc = extractHeadings(markdown);

  const tabs: DocTab[] = [
    {
      id: "rendered",
      label: "Rendered documentation",
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
  ];

  return (
    <ProjectLayout activeSlug={project.slug}>
      <ProjectHero project={project} />
      <DocExperience tabs={tabs} toc={toc} />
    </ProjectLayout>
  );
}
