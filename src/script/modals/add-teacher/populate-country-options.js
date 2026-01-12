import { getCountriesUtil } from '../../util/get-countries.util.js';

export const populateCountryOptions = async () => {
    const container = document.querySelector("#teacher-country");
    if (!container) return;
    const options = (await getCountriesUtil()).map(c => `<option value="${c}">${c}</option>`);
    if (!options) return;
    container.innerHTML = options.join('');
};
