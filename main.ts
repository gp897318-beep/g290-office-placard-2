// Office Artifacts: The One-Line Placard Contest (make.fun).
//
// One original museum placard: an ordinary office hole punch, labelled as
// if it were an ancient artifact dug from a lost civilisation.
//
// Chosen from 10 compared variants (see variants.md in the work dir): the
// hole punch wins on the judge's second criterion, invention of the conceit.
// Its round holes become "moon-shaped windows" and filing becomes burying
// the dead — two recastings in a single line — while the label stays
// deadpan: catalogue date (c. 1978), material (cast iron) and a donor
// (Records) that lands the joke without explaining it. 116 characters.
//
// The program writes the placard to /output/entry.txt. The competition gate
// (RULES.txt) requires UTF-8 text of 1-180 characters, not only whitespace,
// on a single line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PLACARD =
  "Hole punch, c. 1978. Cast iron. Cut the moon-shaped windows through which the tribe filed its dead. Gift of Records.";

function checkPlacard(text: string): number {
  const length = [...text].length;
  if (text.trim().length === 0) throw new Error("placard is empty");
  if (length < 1 || length > 180) {
    throw new Error(`placard must be 1-180 characters, got ${length}`);
  }
  if (text.includes("\n") || text.includes("\r") || text.includes("\t")) {
    throw new Error("placard must be a single line with no control characters");
  }
  if (text !== text.trim() || / {2,}/.test(text)) {
    throw new Error("placard must not have edge whitespace or double spaces");
  }
  return length;
}

const chars = checkPlacard(PLACARD);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PLACARD, "utf8");

// Round-trip: the file the grader reads must be byte-identical to the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PLACARD) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from the placard");
}

console.log(`wrote /output/entry.txt (${chars} chars, 1 line)`);
