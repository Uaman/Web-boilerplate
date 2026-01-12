import { isString } from "lodash-es";

export const startsWithCapitalChar = (str) => {
    if (!isString(str) || str === '') {
        return false;
    }
    return str.charAt(0) === str.charAt(0).toLocaleUpperCase();
};

export const startsWithCapitalCharEveryWord = (str) => {
    if (!isString(str) || str === '') {
        return false;
    }

    return str.split(/\s+/).every((word) => startsWithCapitalChar(word));
};

