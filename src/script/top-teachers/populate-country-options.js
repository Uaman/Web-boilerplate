import { getCountries } from '../util/get-countries.js';

export const populateCountryOptions = () => {
    const container = document.querySelector("#filter-country");
    if (!container) return false;
    const prev = container.value;
    container.innerHTML = '<option value="all">All</option>' + getCountries().map(c => `<option value="${c}">${c}</option>`).join('');
    container.value = prev;

    return true;
};
