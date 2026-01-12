export const renderCarousel = (container) => {
    const prevBtn = document.querySelector(".carousel-button-prev");
    const nextBtn = document.querySelector(".carousel-button-next");

    if (!prevBtn || !nextBtn) return;

    const scrollAmount = container.firstElementChild?.offsetWidth || 250;

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
};
