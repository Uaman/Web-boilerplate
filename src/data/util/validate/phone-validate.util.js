import { isValidPhoneNumber } from "libphonenumber-js";
import { countryPhoneCodeFromCountryNameUtil } from "../helper/country-phone-code-from-name.util.js";
import { isString } from 'lodash-es';

export const phoneValidateUtil = (phone, countryName) => {
    if(!isString(phone) || !isString(countryName) || phone === '' || countryName === '') return false;
    return isValidPhoneNumber(phone) && phone.includes('+'+countryPhoneCodeFromCountryNameUtil(countryName));
};
