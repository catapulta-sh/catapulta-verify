import fs from "node:fs/promises";
import path from "node:path";

export const loadJson = async (jsonPath: string) => JSON.parse(await fs.readFile(path.normalize(jsonPath), "utf8"));
