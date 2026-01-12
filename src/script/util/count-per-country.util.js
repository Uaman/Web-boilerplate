import { getCountriesUtil } from "./get-countries.util.js";

export const countPerCountry = async (users) => {
    const countries = await getCountriesUtil();
    return countries.map(country => ({
        country,
        count: users.filter(u => u.country === country).length
    }));
};
