import { StoredUser } from '../types/FormattedUser';
import { SortingUserFilters } from '../types/UserFilters';

export function sortUsers(
	users: StoredUser[],
	sortBy: keyof SortingUserFilters,
	order: 'asc' | 'desc' = 'asc',
): StoredUser[] {
	const usersCopy = [...users];

	usersCopy.sort((a, b) => {
		let valueA = a[sortBy];
		let valueB = b[sortBy];

		if (valueA === undefined || valueB === undefined) {
			return 0;
		}

		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return order === 'asc' ? valueA - valueB : valueB - valueA;
		}

		if (typeof valueA === 'string' && typeof valueB === 'string') {
			const comparison = valueA.localeCompare(valueB);
			return order === 'asc' ? comparison : -comparison;
		}

		return 0;
	});

	return usersCopy;
}
