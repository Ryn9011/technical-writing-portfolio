import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-slate-900">Ryan Jennings</p>
            <p className="mt-1 text-sm text-slate-500">
              Technical Writer · Developer Documentation · Software Engineering
            </p>
          </div>
          <nav aria-label="Footer" className="flex gap-6 text-sm">
            <Link href="/work" className="text-slate-500 hover:text-slate-900">
              Work
            </Link>
            <Link href="/#about" className="text-slate-500 hover:text-slate-900">
              About
            </Link>
            <Link href="/#contact" className="text-slate-500 hover:text-slate-900">
              Contact
            </Link>
          </nav>
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-slate-400">
          Selected examples of technical documentation from real software projects. The
          underlying applications are private, so source code and implementation details have
          been selectively presented here rather than published in full.
        </p>

        <p className="mt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} Ryan Jennings.
        </p>
      </div>
    </footer>
  );
}
