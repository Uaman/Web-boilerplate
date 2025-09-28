import { renderUsers } from './render/renderUsers';
import { StoredUser } from './types/FormattedUser';

export function setUpSearch(users: StoredUser[], search: (users: StoredUser[], searchValue: string) => StoredUser[]) {
	const searchInput = document.getElementById('search-field') as HTMLInputElement;
	const searchButton = document.getElementById('search-button');

	searchButton?.addEventListener('click', (event) => {
		const searchValue = searchInput.value;
		const searchResults = search(users, searchValue);
		console.log(searchResults);
		renderUsers(searchResults);
	});
}
