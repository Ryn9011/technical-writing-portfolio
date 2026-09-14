import { readFile } from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Reads a markdown doc from content/docs verbatim. Server-only. */
export async function getDocSource(file: string): Promise<string> {
  return readFile(path.join(CONTENT_DIR, "docs", file), "utf-8");
}

/** Reads a source code file from content/code verbatim. Server-only. */
export async function getCodeSource(file: string): Promise<string> {
  return readFile(path.join(CONTENT_DIR, "code", file), "utf-8");
}
