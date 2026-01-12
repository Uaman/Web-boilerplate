import { isNil, isString, keys } from 'lodash-es';

const sort_fields = ['full_name', 'age', 'b_day', 'country', 'course', 'gender'];

export const parseSort = (sort = {}) => {
    const ks = keys(sort);
    if (ks.length !== 2 || !ks.includes('order') || !ks.includes('sortBy')) return null;

    const { order, sortBy } = sort;

    if (!sort_fields.includes(sortBy)) return null;
    if (!['asc', 'desc'].includes(order)) return null;

    return { order, sortBy };
};

export const usersSortUtil = (users, sort = {}) => {
    const parsedSort = parseSort(sort);
    if (isNil(parsedSort)) return users;

    const { order, sortBy } = parsedSort;
    const orderNum = order === 'asc' ? 1 : -1;

    return [...users].sort((a, b) => {
        const va = a?.[sortBy];
        const vb = b?.[sortBy];

        if (isString(va) && isString(vb)) {
            return va.localeCompare(vb) * orderNum;
        }

        if (va > vb) return 1 * orderNum;
        if (va < vb) return -1 * orderNum;
        return 0;
    });
};
