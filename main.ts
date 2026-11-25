import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Judge brief: one sentence of horror, dread that outlasts the line, concrete image, no mirror/doll/basement, last word lands the blow.
const SENTENCE =
  "The baby monitor crackled, and in the static I heard my own voice whispering my daughter's name — from inside her room.";

// Self-check: the sealed gate accepts UTF-8 text of 1 to 200 characters, not only white space.
if ([...SENTENCE].length < 1 || [...SENTENCE].length > 200 || SENTENCE.trim().length === 0) {
  throw new Error("entry fails the 1-200 character gate");
}

// Self-check: brief bans mirror/doll/basement imagery and the line must land with final punctuation.
const FORBIDDEN = ["mirror", "doll", "basement"];
if (FORBIDDEN.some((w) => SENTENCE.toLowerCase().includes(w)) || !/[.!?]$/.test(SENTENCE)) {
  throw new Error("entry uses forbidden imagery or lacks a closing blow");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE, "utf8");
