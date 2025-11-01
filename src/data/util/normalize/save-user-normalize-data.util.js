import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { userNormalizeDataUtil } from '../user-normalize-data.util.js';

export const userNormalizeAndSave = async (data, filename = 'users.json', baseUrl = import.meta.url) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    await writeFile(outPath, JSON.stringify(userNormalizeDataUtil(data), null, 2));
};
