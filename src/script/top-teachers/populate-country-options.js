import { getCountriesUtil } from '../util/get-countries.util.js';

export const populateCountryOptions = async () => {
    const container = document.querySelector("#filter-country");
    if (!container) return;
    const prev = container.value;
    container.innerHTML = '<option value="all">All</option>' + (await getCountriesUtil()).map(c => `<option value="${c}">${c}</option>`).join('');
    container.value = prev;
};
