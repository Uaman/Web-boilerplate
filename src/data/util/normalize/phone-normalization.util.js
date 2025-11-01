import { isValidPhoneNumber, } from "libphonenumber-js";
import { countryPhoneCodeFromCountryNameUtil } from "../helper/country-phone-code-from-name.util.js";


export const phoneNormalizeUtil = (phone, countryName) => {
    if (!phone || !countryName) return null;
    const raw = String(phone).trim();

    const digits = raw.replace(/\D+/g, '').replace(/^0+/, '');
    if (!digits) return null;

    const candidate = `+${countryPhoneCodeFromCountryNameUtil(countryName)}${digits}`;
    return isValidPhoneNumber(candidate) ? candidate : null;
};
