import { GlobalService } from './service/service';
import { renderTable } from './render/renderTable';
import { SortingUserFilters } from './types/UserFilters';
import { sortUsers } from './utils/sortUsers';

export function setUpSorting() {
	const tableHead = document.getElementById('statistics-table-head');
	let currentSortField: keyof SortingUserFilters | null = null;
	let currentSortOrder: 'asc' | 'desc' = 'asc';

	tableHead?.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;
		const thElement = target.closest('th');
		const allThElements = tableHead.querySelectorAll('th');
		allThElements.forEach((th) => {
			th === thElement ? th.classList.toggle('up') : th.classList.remove('up');
		});

		if (!thElement || !thElement.dataset.value) return;

		const sortBy = thElement.dataset.value as keyof SortingUserFilters;

		if (currentSortField === sortBy) {
			currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			currentSortOrder = 'asc';
		}
		currentSortField = sortBy;

		const sortedUsers = sortUsers(GlobalService.displayedUsers, sortBy, currentSortOrder);

		renderTable(sortedUsers);
	});
}
