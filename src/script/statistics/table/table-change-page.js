import { goToTablePage } from './go-to-table-page.js';

export const tableChangePage = (section, state) => {
    section.addEventListener("click", async (e) => {
        const btn = e.target.closest(".pager-btn");
        if (!btn) return;
        state.currentPage = await goToTablePage(
            Number(btn.dataset.page),
            state.currentPage,
            state.TABLE_ROWS_AMOUNT,
            state.getUsers,
            state.sort
        );
    });
};
