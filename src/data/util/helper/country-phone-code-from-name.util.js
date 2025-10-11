import countries from "i18n-iso-countries";
import { getCountryCallingCode } from "libphonenumber-js";
import enLocale from "i18n-iso-countries/langs/en.json" with { type: "json" };

countries.registerLocale(enLocale);


export const countryPhoneCodeFromCountryNameUtil = (countryName) => {
    const iso2 = countries.getAlpha2Code(countryName, 'en');
    if (!iso2) {
        throw new Error(`Country not found: ${countryName}`);
    }

    return getCountryCallingCode(iso2);
};
