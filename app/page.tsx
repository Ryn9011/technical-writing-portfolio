import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhatIDocument } from "@/components/home/WhatIDocument";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Ryan Jennings — Technical Writer & Developer Documentation",
  description:
    "Technical writer with a software engineering background. Real examples of API documentation, system architecture and integration documentation.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDocument />
      <FeaturedWork />
      <About />
      <Contact />
    </>
  );
}
