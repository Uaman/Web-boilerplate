import { CustomEvents } from '../events.js';

document.addEventListener(CustomEvents['components:loaded'], () => {
    const filtersContainer = document.querySelector(".top-teachers-filters");
    if (!filtersContainer) return;

    const parseFilterOptions = () => {
        const selectedAge = filtersContainer.querySelector('[name="age"]').value;
        const selectedCountry = filtersContainer.querySelector('[name="country"]').value;
        const selectedSex = filtersContainer.querySelector('[name="sex"]').value;
        const selectedFavorite = filtersContainer.querySelector('[name="only-favourites"]').checked;
        const selectedPhoto = filtersContainer.querySelector('[name="only-with-photo"]').checked;
        let ageParsed = selectedAge;
        if (ageParsed === "all") {
            ageParsed = {};
        } else {
            ageParsed = ageParsed.split("-").map(Number);
            ageParsed = ageParsed.length === 2 ? { min: ageParsed[0], max: ageParsed[1] } : { min: ageParsed[0] };
        }

        return {
            ageRange: ageParsed,
            countries: selectedCountry === "all" ? [] : [selectedCountry],
            genders: selectedSex === "all" ? [] : [selectedSex],
            favorites: selectedFavorite ? [true] : [],
            photos: selectedPhoto ? [true] : [],
        };
    };

    const updateFilters = () => {
        document.dispatchEvent(new CustomEvent(CustomEvents['filters:changed'], { detail: parseFilterOptions() }));
    };

    filtersContainer.addEventListener("change", updateFilters);

    updateFilters();
});
