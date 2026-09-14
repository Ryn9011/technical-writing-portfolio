function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.238-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.31.679.921.679 1.856 0 1.34-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.012C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}
function EmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M12 13.065L2 6.75V18c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V6.75l-10 6.315zM12 11L2 4h20l-10 7z" />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const LINKS = [
   {
    label: "Email",
    href: "mailto:ryanjennings83@protonmail.com",
    handle: "ryanjennings83@protonmail.com",
    icon: EmailIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ryan-jennings-851816163/",
    handle: "ryan-jennings",
    icon: LinkedinIcon,
  },
    {
    label: "GitHub",
    href: "https://github.com/ryn9011",
    handle: "ryn9011",
    icon: GithubIcon,
  }
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Contact</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-7 text-slate-600">
            I&apos;m open to remote technical writing, developer documentation and API
            documentation roles at software, SaaS and developer-tool companies.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <link.icon className="h-4 w-4 text-slate-500" aria-hidden />
              <span>
                {link.label}
                <span className="ml-1.5 text-slate-400">@{link.handle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
