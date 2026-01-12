import { CustomEvents } from '../events.js';

document.addEventListener(CustomEvents['components:loaded'], () => {
    const form = document.querySelector(".search-bar");
    const input = document.getElementById("search-input");
    if (!form || !input) return;

    const emitSearch = (searchValue) => {
        document.dispatchEvent(new CustomEvent(CustomEvents['search:changed'], { detail: searchValue }));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        emitSearch(input.value.trim());
    });

    input.addEventListener("input", () => {
        if (input.value === "") emitSearch("");
    });
});

