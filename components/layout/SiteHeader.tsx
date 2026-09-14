import Link from "next/link";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-semibold text-white">
            RJ
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Ryan Jennings
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          <NavLink href="/" exact>
            Home
          </NavLink>
          <NavLink href="/work">Work</NavLink>        
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
