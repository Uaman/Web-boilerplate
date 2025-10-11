import { renderTable } from './render-table.js';
import { renderTablePager } from './render-table-pager.js';

export const goToTablePage = (page, currentPage, TABLE_ROWS_AMOUNT, users, sort) => {
    const total = Math.max(1, Math.ceil(users.length / TABLE_ROWS_AMOUNT));
    const updCurrentPage = Math.min(Math.max(1, page), total);
    renderTable({
        users,
        sort,
        currentPage: updCurrentPage,
        TABLE_ROWS_AMOUNT
    });
    renderTablePager(users.length, TABLE_ROWS_AMOUNT, updCurrentPage);

    return updCurrentPage;
};
