export interface ProjectDoc {
  /** File name inside content/docs, e.g. "system-architecture.md" */
  file: string;
  /** Original file name, shown to visitors as the "real" source file */
  displayName: string;
}

export interface ProjectCode {
  /** File name inside content/code, e.g. "InvitationController.cs" */
  file: string;
  displayName: string;
  language: string;
}

export type ProjectCategory = "technical" | "end-user";

export interface Project {
  slug: string;
  /** Which featured-work section this project belongs to */
  category: ProjectCategory;
  /** Small uppercase label used on cards, e.g. "SYSTEM ARCHITECTURE" */
  eyebrow: string;
  title: string;
  subtitle: string;
  /** One or two sentence summary used on home page cards */
  summary: string;
  /** Longer description used on the project page itself */
  description: string;
  tags: string[];
  /** Documentation types/skills this piece demonstrates */
  highlights: string[];
  doc: ProjectDoc;
  code?: ProjectCode;
}

export const projects: Project[] = [
  {
    slug: "system-architecture",
    category: "technical",
    eyebrow: "SYSTEM ARCHITECTURE",
    title: "System Architecture",
    subtitle: "AI Sales Platform",
    summary:
      "Architecture documentation covering system components, data flows, authentication, background processing, deployment and monitoring.",
    description:
      "Technical architecture documentation for a multi-tenant SaaS platform covering the frontend, API, database, background processing, authentication, AI services, telephony, meeting capture, CRM, billing and monitoring.",
    tags: ["Architecture", "System Documentation", "Mermaid", "ASP.NET Core", "Next.js"],
    highlights: [
      "System architecture",
      "Architecture diagrams",
      "Component documentation",
      "Data flows",
      "Authentication and authorization",
      "Background processing",
      "Failure scenarios",
      "Deployment",
      "Monitoring",
    ],
    doc: { file: "system-architecture.md", displayName: "SYSTEM_ARCHITECTURE.md" },
  },
  {
    slug: "hubspot-integration",
    category: "technical",
    eyebrow: "HUBSPOT INTEGRATION",
    title: "Automated CRM Enrichment via HubSpot",
    subtitle: "Engineering Documentation",
    summary:
      "Engineering documentation covering OAuth 2.0, CRM integration, security, audit logging, retries and architectural decisions.",
    description:
      "Engineering documentation for a HubSpot CRM integration covering OAuth 2.0 authentication, enrichment workflows, audit logging, retry handling, multi-tenancy, security and implementation decisions.",
    tags: ["Technical Documentation", "OAuth 2.0", "APIs", "Security", "Integration"],
    highlights: [
      "Integration documentation",
      "OAuth 2.0",
      "API documentation",
      "Architecture",
      "Design decisions and trade-offs",
      "Security",
      "Data modelling",
      "Testing",
      "Troubleshooting",
      "Implementation details",
    ],
    doc: { file: "hubspot-integration.md", displayName: "HUBSPOT_IMPLEMENTATION_SUMMARY.md" },
  },
  {
    slug: "hubspot-user-guide",
    category: "end-user",
    eyebrow: "HUBSPOT INTEGRATION",
    title: "Setting Up the HubSpot Integration",
    subtitle: "End-User Guide",
    summary:
      "A customer-facing guide covering how to connect HubSpot, understand the integration, check connection status, troubleshoot common problems and manage the connection.",
    description:
      "End-user documentation for the HubSpot CRM integration, written for organisation administrators rather than engineers. Covers connecting and disconnecting the integration, what happens once it is connected, checking connection status, troubleshooting common issues and frequently asked questions.",
    tags: ["User Guide", "OAuth 2.0", "Onboarding", "Troubleshooting", "FAQ"],
    highlights: [
      "End-user documentation",
      "Step-by-step setup instructions",
      "Troubleshooting",
      "FAQ writing",
      "Plain-language security explanation",
      "Writing for a non-technical audience",
    ],
    doc: { file: "hubspot-user-guide.md", displayName: "hubspot-user-guide.md" },
  },
  {
    slug: "hubspot-troubleshooting",
    category: "end-user",
    eyebrow: "HUBSPOT INTEGRATION",
    title: "Troubleshooting the HubSpot Integration",
    subtitle: "Customer Troubleshooting Guide",
    summary:
      "A practical troubleshooting guide for diagnosing connection, enrichment, matching, and CRM update issues.",
    description:
      "Customer-facing troubleshooting documentation for the HubSpot CRM integration. Explains enrichment statuses, contact and deal matching, partial failures, audit history, retries, authentication issues, and when to contact support.",
    tags: ["Troubleshooting", "Customer Documentation", "CRM", "OAuth 2.0", "Support Content"],
    highlights: [
      "Customer troubleshooting",
      "Diagnostic workflows",
      "Plain-language technical explanations",
      "Enrichment status guidance",
      "Failure recovery",
      "Support escalation guidance",
    ],
    doc: { file: "hubspot-troubleshooting.md", displayName: "hubspot-troubleshooting.md" },
  },
  {
    slug: "invitation-api",
    category: "technical",
    eyebrow: "INVITATION API",
    title: "Invitation API",
    subtitle: "Developer API Documentation",
    summary:
      "API reference covering authentication, authorization, requests, responses, errors, bulk operations and Clerk integration.",
    description:
      "Developer documentation for an organization invitation API covering authentication, role-based authorization, endpoint behaviour, request and response formats, error handling, bulk invitations and Clerk integration.",
    tags: ["API Documentation", "REST", "ASP.NET Core", "Clerk", "C#"],
    highlights: [
      "API reference documentation",
      "Authentication and authorization",
      "Request and response formats",
      "Error handling",
      "Bulk operations",
      "Role-based access control",
      "Documentation cross-referenced with real implementation",
    ],
    doc: { file: "invitation-api.md", displayName: "INVITATION_API.md" },
    code: {
      file: "InvitationController.cs",
      displayName: "InvitationController.cs",
      language: "csharp",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Technical documentation samples, written for engineers and based on real code. */
export const technicalProjects: Project[] = projects.filter((p) => p.category === "technical");

/** Documentation written for non-technical, end-user audiences. */
export const endUserProjects: Project[] = projects.filter((p) => p.category === "end-user");
