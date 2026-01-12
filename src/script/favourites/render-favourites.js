import { createFavouriteTeacherCard } from './create-favorite-teacher-card.js';
import { renderCarousel } from './render-carousel.js';

export const renderFavourites = (usersList) => {
    const container = document.querySelector(".carousel-list");
    if (!container) return;
    const favourites = usersList.filter((u) => u.favorite === true);
    container.innerHTML = favourites.map(createFavouriteTeacherCard).join("");

    renderCarousel(container);
};
