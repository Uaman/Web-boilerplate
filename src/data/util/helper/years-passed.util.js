import { isDate } from "lodash-es";

export const yearsPassedUtil = (date) => {
    if (!isDate(date)) return null;
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < date.getDate())) age--;
    return age;
};
