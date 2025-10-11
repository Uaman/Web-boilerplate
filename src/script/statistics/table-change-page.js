import { goToTablePage } from './go-to-table-page.js';

export const tableChangePage = (section, state) => {
    section.addEventListener("click", (e) => {
        const btn = e.target.closest(".pager-btn");
        if (!btn) return;

        state.currentPage = goToTablePage(
            Number(btn.dataset.page),
            state.currentPage,
            state.TABLE_ROWS_AMOUNT,
            state.users,
            state.sort
        );
    });
};
