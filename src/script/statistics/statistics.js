import { renderTable } from './table/render-table.js';
import { renderTablePager } from './table/render-table-pager.js';
import { tableChangeSort } from './table/table-change-sort.js';
import { tableChangePage } from './table/table-change-page.js';
import { CustomEvents } from '../events.js';
import { fetchUsers } from '../util/fetch-users.util.js';
import { switchTabStatistics } from './switch-tab.js';
import { renderPieChart } from './pie-chart/render-pie-chart.js';
import {
    changeToFlatTable,
    changeToReportByCountry,
    renderWebdatarocksTable
} from './webdatarocks-table/render-webdatarocks-table.js';

const TABLE_ROWS_AMOUNT = 10;
let currentPage = 1;
let sort = { sortBy: null, order: null };
let activeFilters = {};
let activeSearch = '';

const getUsers = async () => {
    return await fetchUsers(activeFilters, activeSearch);
};

const state = {
    getUsers,
    sort,
    currentPage,
    TABLE_ROWS_AMOUNT,
};

const render = async (section) => {
    const users = await getUsers();
    await renderTable(state);
    renderTablePager(users.length, TABLE_ROWS_AMOUNT, currentPage);
    tableChangePage(section, state);
    tableChangeSort(section, state);
    renderPieChart(users);
    renderWebdatarocksTable(users);
    changeToReportByCountry();
    changeToFlatTable();
    switchTabStatistics();
};

document.addEventListener(CustomEvents['components:loaded'], async () => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    currentPage = 1;
    await render(section);
});

document.addEventListener(CustomEvents['filters:changed'], async (e) => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    activeFilters = e.detail || {};
    await render(section);
});

document.addEventListener(CustomEvents['search:changed'], async (e) => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    activeSearch = e.detail || '';
    await render(section);
});
