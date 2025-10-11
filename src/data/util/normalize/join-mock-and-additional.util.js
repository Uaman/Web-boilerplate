import _ from 'lodash-es';
import { userGetComparableIdUtil } from './user-get-comparable-id.util.js';

const fillMissingDeep = (base, donor) => {
    return _.mergeWith({}, donor, base, (objVal, srcVal) => {
        if (!_.isNil(objVal) && objVal !== '') return objVal;
        return srcVal;
    });
};

export const joinMockAndAdditionalUtil = (randomUserMock, additionalUsers) => {
    const joinedUsers = new Map();

    for (const u of additionalUsers ?? []) {
        let key = userGetComparableIdUtil(u);
        if (key === u.id) {
            if(randomUserMock.find(randU => userGetComparableIdUtil(randU) === key)){
                key = userGetComparableIdUtil(u, true);
            }
        }
        if (!key) continue;
        joinedUsers.set(key, u);
    }

    for (const u of randomUserMock ?? []) {
        const key = userGetComparableIdUtil(u);
        if (!key) continue;
        if (joinedUsers.has(key)) {
            const merged = fillMissingDeep(joinedUsers.get(key), u);
            joinedUsers.set(key, merged);
        } else {
            joinedUsers.set(key, u);
        }
    }

    return Array.from(joinedUsers.values());
};
