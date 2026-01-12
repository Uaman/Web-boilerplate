import path from 'path';
import { fileURLToPath } from 'url';
import { userValidateDataUtil } from '../user-validate-data.util.js';
import { writeFile } from 'fs/promises';

export const userValidateDataAndSave = async (data, filename = 'users-validated.json', baseUrl = import.meta.url ) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    await writeFile(outPath, JSON.stringify(userValidateDataUtil(data), null, 2));
};
