import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-indigo-600">
            Technical Writer
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Developer Documentation · APIs · Software Engineering
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ryan Jennings
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            I&apos;m a software developer and technical writer with 7+ years of professional experience
            working with web applications, APIs and internal systems.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Throughout my career, writing has been a significant part of my work. I&apos;ve written and
            maintained technical documentation, explained systems and processes, and worked with developers
            and end users to make technical information clearer and easier to understand.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            My software engineering background means I understand the systems I write about at an
            implementation level. I can work from source code, APIs, databases and architecture, understand
            the decisions behind them, and turn that information into documentation that is accurate and
            useful.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            This portfolio showcases documentation from software I&apos;ve designed and built, covering
            system architecture, API reference material, integrations, authentication, security, data
            flows, troubleshooting and implementation details.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            I&apos;m now looking to bring both sides of that experience together in technical writing and
            developer documentation roles.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              View documentation samples
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
