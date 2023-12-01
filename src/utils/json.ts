import fs from 'fs/promises';
import path from 'path';

export const loadJson = async (jsonPath: string) => JSON.parse(await fs.readFile(path.normalize(jsonPath), "utf8"));