export function setUpHorizontalScroll(): void {
	const leftArrow = document.getElementById('left-arrow');
	const rightArrow = document.getElementById('right-arrow');
	const scrollContainer = document.getElementById('favorites-slider-container');

	leftArrow.addEventListener('click', () => {
		scrollContainer.scrollBy({
			left: -210,
			behavior: 'smooth',
		});
	});

	rightArrow.addEventListener('click', () => {
		scrollContainer.scrollBy({
			left: 210,
			behavior: 'smooth',
		});
	});
}
