import path from "path";
import fs from "fs/promises";

export const loadJson = async (jsonPath: string) => JSON.parse(await fs.readFile(path.normalize(jsonPath), "utf8"));
