import { emailValidateUtil } from './validate/email-validate.util.js';
import { phoneValidateUtil } from './validate/phone-validate.util.js';
import { isNumber } from 'lodash-es';
import {
    startsWithCapitalChar,
    startsWithCapitalCharEveryWord
} from './validate/string-fields-validate.util.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

export const userValidateDataUtil = (data) => {
    const changedIds = new Set();
    const markInvalid = (id) => {
        changedIds.add(id);
        return null;
    };
    const users = data.map((user) => {
        user = {
            ...user,
            email: emailValidateUtil(user?.email) ? user?.email : markInvalid(user.id),
            phone: phoneValidateUtil(user?.phone, user?.country) ? user?.phone : markInvalid(user.id),
            age: isNumber(user?.age) ? user?.age : markInvalid(user.id),
            gender: startsWithCapitalChar(user?.gender) ? user?.gender : markInvalid(user.id),
            note: startsWithCapitalChar(user?.note) ? user?.note : markInvalid(user.id),
            state: startsWithCapitalChar(user?.state) ? user?.state : markInvalid(user.id),
            city: startsWithCapitalChar(user?.city) ? user?.city : markInvalid(user.id),
            full_name: startsWithCapitalCharEveryWord(user?.full_name) ? user?.full_name : markInvalid(user.id),
        };
        return user;
    });
    //eslint-disable-next-line
    console.log(`Invalid fields were in: [${Array.from(changedIds).join(', ')}]`);

    return {changedIds: Array.from(changedIds), users: users};
};

export const userValidateDataAndSave = async (data, filename = 'users-validated.json', baseUrl = import.meta.url ) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    await writeFile(outPath, JSON.stringify(userValidateDataUtil(data), null, 2));
};
