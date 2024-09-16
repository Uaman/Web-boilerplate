function carouselHandler() {
  console.info("Instantiating carousel controller");

  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const cardWidth = document.querySelector(".teacher-card").offsetWidth + 20;

  let currentIndex = 0;
  const totalCards = track.children.length;
  const visibleCards = Math.floor(track.parentElement.clientWidth / cardWidth);
  const maxIndex = totalCards - visibleCards;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateCarousel();
    }
  });
}

module.exports = carouselHandler;
