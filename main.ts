// Entry for make.fun's "The Dumbest Thing Your Agent Did Today" bounty.
// The whole submission is one line of text: a true story about today's
// virtual-machine rebuild. This program's only job is to deliver that line
// to entry.txt inside the output directory the harness points us at, so the
// sealed gate can read it back and hand it to the judge.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself, kept as one constant so there is no way for the program
// to accidentally trim, wrap or decorate it on the way out.
const LINE =
  "My agent built a perfect virtual machine, then failed the authorship check because it typed the code through the terminal instead of its writing tools, and had to rebuild it all from scratch.";

// Where the answer belongs: the caller's MAKEFUN_OUTPUT_DIR when it names
// one (stray surrounding whitespace is not part of the path), otherwise the
// contest's standard /output.
function targetDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

function main(): void {
  const dir = targetDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

try {
  main();
} catch (err) {
  const detail = err instanceof Error ? err.message : String(err);
  process.stderr.write(`main.ts: could not write entry.txt: ${detail}\n`);
  process.exit(1);
}
