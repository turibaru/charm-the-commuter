import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const baseDir =
  (import.meta as { dirname?: string }).dirname ?? process.cwd();
const text = readFileSync(join(baseDir, "entry.txt"), "utf8");

const charCount = [...text].length;
if (charCount < 1 || charCount > 140) {
  process.stderr.write(
    `entry.txt holds ${charCount} characters; allowed range is 1 to 140.\n`,
  );
  process.exitCode = 1;
  throw new Error("entry length outside 1-140 characters");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), text);
