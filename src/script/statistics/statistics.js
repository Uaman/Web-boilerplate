import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { renderTable } from './render-table.js';
import { renderTablePager } from './render-table-pager.js';
import { tableChangeSort } from './table-change-sort.js';
import { tableChangePage } from './table-change-page.js';

const TABLE_ROWS_AMOUNT = 10;
let currentPage = 1;
let sort = { sortBy: null, order: null };
const users = usersValidated.users || [];

const state = {
    users,
    sort,
    currentPage,
    TABLE_ROWS_AMOUNT,
};

document.addEventListener("components:loaded", () => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    currentPage = 1;
    renderTable(state);
    renderTablePager(users.length, TABLE_ROWS_AMOUNT, currentPage);
    tableChangePage(section, state);
    tableChangeSort(section, state);
});
