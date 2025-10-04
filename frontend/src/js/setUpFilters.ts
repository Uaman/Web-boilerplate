import { GlobalService } from './service/service';
import { UserFilters } from './types/UserFilters';
import { filterUsers } from './utils/filterUsers';

export function applyFilters() {
	const filters = getCurrentFilters();
	const filterResult = filterUsers(GlobalService.users, filters);
	GlobalService.displayedUsers = filterResult;
}

export function setUpFilters() {
	const filtersForm = document.getElementById('filters-form');
	const regionFilter = document.getElementById('region-filter') as HTMLSelectElement;

	function populateRegionFilter() {
		const uniqueCountries = Array.from(new Set(GlobalService.users.map((user) => user.country)));

		const fragment = document.createDocumentFragment();

		const defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.textContent = 'Select';
		fragment.appendChild(defaultOption);

		uniqueCountries.forEach((country) => {
			const option = document.createElement('option');
			option.value = country;
			option.textContent = country;
			fragment.appendChild(option);
		});

		regionFilter.innerHTML = '';
		regionFilter.appendChild(fragment);
	}

	populateRegionFilter();

	if (filtersForm) {
		filtersForm.addEventListener('input', GlobalService.applyRestrictions);
	}
}

function getCurrentFilters(): UserFilters {
	const regionFilter = document.getElementById('region-filter') as HTMLSelectElement;
	const ageFilter = document.getElementById('age-filter') as HTMLSelectElement;
	const sexFilter = document.getElementById('gender-filter') as HTMLSelectElement;
	const withPhotoOnly = document.getElementById('with-photo-only') as HTMLInputElement;
	const favoritesOnly = document.getElementById('favorites-only') as HTMLInputElement;

	const [min, max] = ageFilter.value.split('-').map(Number);

	return {
		age: { min, max },
		country: regionFilter.value.length > 0 ? regionFilter.value : undefined,
		gender: sexFilter.value === 'Male' || sexFilter.value === 'Female' ? sexFilter.value : undefined,
		picture_large: withPhotoOnly.checked ? true : undefined,
		favorite: favoritesOnly.checked ? true : undefined,
	};
}
