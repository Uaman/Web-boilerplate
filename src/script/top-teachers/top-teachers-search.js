document.addEventListener("components:loaded", () => {
    const form = document.querySelector(".search-bar");
    const input = document.getElementById("search-input");
    if (!form || !input) return false;

    const emitSearch = (searchValue) => {
        document.dispatchEvent(new CustomEvent("search:changed", { detail: searchValue }));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        emitSearch(input.value.trim());
    });

    input.addEventListener("input", () => {
        if (input.value === "") emitSearch("");
    });

    return true;
});

