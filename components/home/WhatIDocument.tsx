import {
  BookOpen,
  Braces,
  Network,
  ListChecks,  
  Plug,
  Wrench,
} from "lucide-react";

const ITEMS = [

  {
    icon: BookOpen,
    title: "Developer Documentation",
    description: "Clear reference material and guides that help developers understand and work with software systems.",
  },

  {
    icon: Braces,
    title: "API Documentation",
    description: "Endpoints, request and response formats, authentication, authorization and error handling, written from the code outward.",
  },

  {
    icon: Network,
    title: "Architecture Documentation",
    description: "How the components of a system fit together, including data flows, background processing and failure modes.",
  },

  {
    icon: ListChecks,
    title: "User & Setup Guides",
    description: "Task-focused, step-by-step guides that help users configure and use software without needing to understand the underlying code.",
  },

  {
    icon: Wrench,
    title: "Troubleshooting & Support",
    description: "Practical documentation that helps users diagnose problems, understand errors and resolve common issues.",
  },

  {
    icon: Plug,
    title: "Integration Documentation",
    description: "How applications connect to third-party services and APIs, including authentication, data flow and integration behaviour.",
  },

];

export function WhatIDocument() {
  return (
    <section aria-labelledby="what-i-document-heading" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">What I document</p>
          <h2 id="what-i-document-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Documentation for the systems software teams actually run
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <item.icon className="h-5 w-5 text-indigo-600" aria-hidden />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
