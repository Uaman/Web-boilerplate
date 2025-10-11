import { getCountries } from '../../util/get-countries.js';

export const populateCountryOptions = () => {
    const container = document.querySelector("#teacher-country");
    if (!container) return false;
    const options = getCountries().map(c => `<option value="${c}">${c}</option>`);
    if (!options) return false;
    container.innerHTML = options.join('');

    return true;
};
