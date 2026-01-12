import { renderTable } from './render-table.js';
import { renderTablePager } from './render-table-pager.js';

export const goToTablePage = async (page, currentPage, TABLE_ROWS_AMOUNT, getUsers, sort) => {
    const users = await getUsers();
    const total = Math.max(1, Math.ceil(users.length / TABLE_ROWS_AMOUNT));
    const next = Math.min(Math.max(1, page), total);
    await renderTable({
        getUsers,
        sort,
        currentPage: next,
        TABLE_ROWS_AMOUNT
    });
    renderTablePager(users.length, TABLE_ROWS_AMOUNT, next);

    return next;
};
