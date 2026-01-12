import { populateCountryOptions } from "./populate-country-options.js";
import { teachersChangePage } from "./teachers-change-page.js";
import { goToTeachersPage } from "./go-to-teachers-page.js";
import { CustomEvents } from '../events.js';
import { fetchUsers } from '../util/fetch-users.util.js';

const TEACHERS_AMOUNT = 10;
let activeFilters = {};
let activeSearch = '';

const getUsers = async () => {
    return await fetchUsers(activeFilters, activeSearch);
};

const state = { currentPage: 1, TEACHERS_AMOUNT, getUsers };

const render = async (page = 1) => {
    state.currentPage = await goToTeachersPage(page, state.currentPage, TEACHERS_AMOUNT, getUsers);
    await populateCountryOptions();
};

document.addEventListener(CustomEvents['components:loaded'], async () => {
    const section = document.querySelector('.top-teachers');
    if (!section) return;
    await render();
    teachersChangePage(section, state);
});

document.addEventListener(CustomEvents['filters:changed'], async (e) => {
    activeFilters = e.detail || {};
    await render();
});

document.addEventListener(CustomEvents['search:changed'], async (e) => {
    activeSearch = e.detail || '';
    await render();
});

document.addEventListener(CustomEvents['favourites:changed'], async () => {
    await render(state.currentPage);
});

document.addEventListener(CustomEvents['teacher:added'], async () => {
    await render(state.currentPage);
});
