import { GlobalService } from './service/service';
import { findUsers } from './utils/findUsers';

export function setUpSearch() {
	const searchButton = document.getElementById('search-button');

	searchButton?.addEventListener('click', GlobalService.applyRestrictions);
}

export function applySearch() {
	const searchInput = document.getElementById('search-field') as HTMLInputElement;

	const searchValue = searchInput.value;
	const searchResults = findUsers(GlobalService.displayedUsers, searchValue);
	GlobalService.displayedUsers = searchResults;
}
