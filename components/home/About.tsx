export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              About
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Background
            </h2>
          </div>

          <div className="max-w-2xl space-y-4 text-[0.9375rem] leading-7 text-slate-700">
            <p>
              I&apos;ve spent more than seven years working as a software developer, building web
              applications, APIs and internal systems.
            </p>

            <p>
              Over that time I&apos;ve found that one of the things I enjoy most is taking
              technical information that is difficult to understand and turning it into something
              clear and useful.
            </p>

            <p>
              I&apos;ve regularly been involved in writing, reviewing and refining technical
              material for development teams and end users. My development background also means
              I&apos;m comfortable reading source code, understanding APIs and databases, following
              system architecture and working through technical problems.
            </p>

            <p>
              That experience has given me a practical understanding of how software is designed,
              built and used. I can work from source code and implementation details through to the
              documentation that developers, technical teams and customers actually need.
            </p>

            <p>
              I&apos;m particularly interested in developer documentation, API documentation,
              system architecture, integrations, technical guides and troubleshooting content. I
              enjoy adapting the level of detail and language to suit the audience, whether that
              means documenting an API for developers or explaining a product workflow to an end
              user.
            </p>

            <p>
              I&apos;m now focusing on technical writing and developer documentation, where I can
              combine my engineering background with strong written communication and a focus on
              making complex software easier to understand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}