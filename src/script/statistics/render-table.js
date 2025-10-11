import { usersSortUtil } from '../../data/util/filter/users-sort.util.js';
import { createStatisticTableRow } from './create-statistic-table-row.js';

export const renderTable = ({
    users,
    sort,
    currentPage,
    TABLE_ROWS_AMOUNT
}) => {
    const tbody = document.querySelector(".statistics-table tbody");
    if (!tbody) return;

    let displayUsers = [...users];
    displayUsers = usersSortUtil(displayUsers, sort);

    const start = (currentPage - 1) * TABLE_ROWS_AMOUNT;
    const pageUsers = displayUsers.slice(start, start + TABLE_ROWS_AMOUNT);

    tbody.innerHTML = pageUsers.map(createStatisticTableRow).join("");
};
