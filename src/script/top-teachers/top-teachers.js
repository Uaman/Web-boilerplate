import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { populateCountryOptions } from './populate-country-options.js';
import { usersFilterUtil } from '../../data/util/filter/users-filter.util.js';
import { usersSearchUtil } from '../../data/util/filter/users-search.util.js';
import { renderTeachers } from './render-teachers.js';

const TEACHERS_AMOUNT = 10;
let activeFilters = {};
let activeSearch = "";

const renderWithFilters = () => {
    let users = usersValidated.users.slice();
    users = usersFilterUtil(users, activeFilters);
    if (activeSearch.trim()) {
        users = usersSearchUtil(users, activeSearch);
    }

    return renderTeachers(users, TEACHERS_AMOUNT) && populateCountryOptions();
};

document.addEventListener("filters:changed", (e) => {
    activeFilters = e.detail || {};
    renderWithFilters();
});

document.addEventListener("search:changed", (e) => {
    activeSearch = e.detail || "";
    renderWithFilters();
});

document.addEventListener("components:loaded", renderWithFilters);
