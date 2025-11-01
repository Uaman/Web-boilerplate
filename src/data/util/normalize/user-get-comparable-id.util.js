import { isObject } from 'lodash-es';

export const userGetComparableIdUtil = (user, getEmail = false) => {
    if (user && isObject(user.id)) {
        const n = user?.id?.name?.toString().trim() || '';
        const v = user?.id?.value?.toString().trim() || '';
        const joined = (n + v).replace(/\s+/g, '');
        if (joined && !getEmail) return joined;
        return user?.email ?? null;
    }
    if (user && !isObject(user.id)) {
        return (user?.id && !getEmail) ? user.id : user?.email ?? null;
    }
    return null;
};
