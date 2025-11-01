import { toggleSort } from "./toggle-sort.js";
import { renderTable } from "./render-table.js";

export const tableChangeSort = (section, state) => {
    section.addEventListener("click", async (e) => {
        const th = e.target.closest("th[data-sort]");
        if (!th) return;

        section.querySelectorAll("th[data-sort]").forEach(header => {
            header.classList.remove("is-sorted-asc", "is-sorted-desc");
        });

        const newSort = toggleSort(state.sort, th.dataset.sort);

        if (newSort.order === "asc") th.classList.add("is-sorted-asc");
        if (newSort.order === "desc") th.classList.add("is-sorted-desc");

        state.sort = newSort;

        await renderTable({
            getUsers: state.getUsers,
            sort: newSort,
            currentPage: state.currentPage,
            TABLE_ROWS_AMOUNT: state.TABLE_ROWS_AMOUNT,
        });
    });
};
