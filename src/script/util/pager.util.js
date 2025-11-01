export const renderPager = (
    usersLength,
    itemsPerPage,
    currentPage,
    containerSelector
) => {
    const total = Math.max(1, Math.ceil(usersLength / itemsPerPage));
    let pager = document.querySelector(`${containerSelector} > ul`);

    if (!pager) {
        pager = document.createElement("ul");
        document.querySelector(containerSelector).appendChild(pager);
    }

    const makeButton = (page, label = String(page)) =>
        `<button type="button" class="pager-btn${currentPage === page ? " is-active" : ""}" data-page="${page}">${label}</button>`;

    if (total === 1) {
        pager.innerHTML = makeButton(1);
        return;
    }

    const pages = Array.from({ length: total - 1 }, (_, i) => i + 1)
        .map(p => makeButton(p))
        .join("");

    pager.innerHTML = pages + makeButton(total, "last");
};
