import { isNil } from 'lodash-es';

export const usersSearchUtil = (users, value) => {
    if(isNil(value) || value === '' ) return users;
    const strValue = String(value).trim();

    return users.filter((user) => {
        const nameOk = !isNil(user?.full_name) ? user.full_name.includes(strValue) : false;
        const noteOk = !isNil(user?.note) ? user.note.includes(strValue) : false;
        const ageOk = !isNil(user?.age) ? String(user.age) === strValue : false;
        return nameOk || noteOk || ageOk;
    });
};
