import { StoredUser } from '../types/FormattedUser';

export function renderTable(users: StoredUser[]): void {
	const tableBody = document.getElementById('statistics-table-body');

	if (!tableBody) {
		console.error('Table body not found');
		return;
	}

	tableBody.innerHTML = '';

	const rowsFragment = document.createDocumentFragment();

	users.forEach((user) => {
		const userElement = document.createElement('tr');

		userElement.innerHTML = `
			<td>${user.full_name}</td>
            <td>${user.course}</td>
			<td>${user.age}</td>
			<td>${user.gender}</td>
			<td>${user.country}</td>
		`;

		rowsFragment.appendChild(userElement);
	});

	tableBody.appendChild(rowsFragment);
}
