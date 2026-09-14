import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/code/CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";
import { normalizeLanguage } from "@/components/code/prism";

type CodeProps = ComponentPropsWithoutRef<"code"> & { node?: unknown };

function CodeRenderer({ className, children, ...rest }: CodeProps) {
  const match = /language-(\w+)/.exec(className ?? "");

  if (!match) {
    return (
      <code
        className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800"
        {...rest}
      >
        {children}
      </code>
    );
  }

  const raw = String(children).replace(/\n$/, "");
  const language = normalizeLanguage(match[1]);

  if (language === "mermaid") {
    return <MermaidDiagram chart={raw} />;
  }

  return <CodeBlock code={raw} language={language} />;
}

const components: Components = {
  // The code renderer produces its own container (pre or div), so avoid
  // react-markdown's default `<pre>` wrapper to prevent double-wrapping.
  pre: ({ children }) => <>{children}</>,
  code: CodeRenderer,
  h1: ({ children, ...props }) => (
    <h1 className="mt-0 scroll-mt-24 text-3xl font-semibold tracking-tight text-slate-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 scroll-mt-24 border-t border-slate-200 pt-8 text-xl font-semibold tracking-tight text-slate-900 first:mt-0 first:border-t-0 first:pt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 scroll-mt-24 text-base font-semibold tracking-tight text-slate-900" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 scroll-mt-24 text-sm font-semibold text-slate-900" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-4 text-[0.9375rem] leading-7 text-slate-700 first:mt-0" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-4 list-outside list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-7 text-slate-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-4 list-outside list-decimal space-y-1.5 pl-5 text-[0.9375rem] leading-7 text-slate-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1 marker:text-slate-400" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-5 border-l-2 border-indigo-300 bg-indigo-50/50 py-2 pl-4 text-[0.9375rem] text-slate-700 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-8 border-slate-200" {...props} />,
  table: ({ children, ...props }) => (
    <div className="not-prose my-5 w-full overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-slate-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-slate-100 px-4 py-2.5 align-top text-slate-700 last:border-b-0" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="last:[&>td]:border-b-0" {...props}>
      {children}
    </tr>
  ),
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="doc-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
