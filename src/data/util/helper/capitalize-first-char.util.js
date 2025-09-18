import { isString } from "lodash-es";

export const capitalizeFirstCharUtil = (str) => {
    if(isString(str) && str !== '') {
        return str.trim()
            .charAt(0)
            .toUpperCase() + str.slice(1);
    }
    return '';
};
