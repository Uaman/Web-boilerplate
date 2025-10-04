import { setUpPagination } from '../setUpPagination';
import { StoredUser } from '../types/FormattedUser';

export function renderTable(users: StoredUser[]): void {
	const userMap = createUserMap(users, 10);
	setUpPagination(userMap, 1);
}

function createUserMap(users: StoredUser[], usersPerPage: number): Map<number, StoredUser[]> {
	const userMap = new Map();
	for (let i = 0; i < users.length; i += usersPerPage) {
		const pageUsers = users.slice(i, i + usersPerPage);
		userMap.set(Math.floor(i / usersPerPage) + 1, pageUsers);
	}
	return userMap;
}
