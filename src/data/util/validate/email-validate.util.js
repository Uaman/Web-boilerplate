import { isString } from 'lodash-es';

export const emailValidateUtil = (email) => {
    if(!isString(email) || email === '') return false;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const emailIsValid = emailRegex.test(email || '');
    if(!emailIsValid) {
        // eslint-disable-next-line
        console.error('Invalid email:', email);
    }
    return emailIsValid;
};
