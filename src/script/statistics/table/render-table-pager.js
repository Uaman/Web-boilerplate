import { renderPager } from '../../util/pager.util.js';

export const renderTablePager = (usersLength, TABLE_ROWS_AMOUNT, currentPage) =>
    renderPager(usersLength, TABLE_ROWS_AMOUNT, currentPage, ".statistics .table-navigation");
