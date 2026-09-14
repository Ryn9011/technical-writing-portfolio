import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { cvFile } from "@/lib/cv";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Ryan Jennings' CV — technical writer and software developer with 7+ years of experience across APIs, developer documentation and web applications. View online or download the PDF.",
};

export default function CvPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">CV</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ryan Jennings — CV
          </h1>
        </div>
        <a
          href={`/${cvFile}`}
          download
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download CV (PDF)
        </a>
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        <object
          data={`/${cvFile}`}
          type="application/pdf"
          className="h-[1100px] w-full"
          aria-label="Ryan Jennings CV PDF preview"
        >
          <div className="flex h-64 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-slate-600">
            <p>Your browser can&apos;t display the PDF preview here.</p>
            <Link href={`/${cvFile}`} className="font-medium text-indigo-600 hover:text-indigo-700">
              Open Ryan_Jennings_CV.pdf directly
            </Link>
          </div>
        </object>
      </div>
    </div>
  );
}
