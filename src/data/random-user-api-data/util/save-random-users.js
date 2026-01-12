import fs from "fs";
import { fetchRandomUsers } from './fetch-users.util.js';
import path from 'path';
import { fileURLToPath } from 'url';

export const saveRandomUsers = async ({
    usersAmount = 30,
    filename = 'random-users.json',
    baseUrl = import.meta.url
}) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    await fs.writeFileSync(outPath, JSON.stringify(await fetchRandomUsers(usersAmount), null, 2), "utf-8");
};

