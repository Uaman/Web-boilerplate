import { StoredUser } from './types/FormattedUser';

export function setUpPagination(usersMap: Map<number, StoredUser[]>, currentPage: number) {
  const paginationPannel = document.getElementById('teachers-table-pagination') as HTMLUListElement;
  paginationPannel.innerHTML = '';

  const totalPages = usersMap.size;

  if (totalPages > 1) {
    drawPagination(currentPage, totalPages, paginationPannel);
  }

  paginationPannel.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const page = target.getAttribute('data-page');
    if (page) {
      setUpPagination(usersMap, Number(page));
    }
  });

  drawTable(usersMap.get(currentPage) || []);
}

function drawTable(users: StoredUser[]): void {
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

function drawPagination(currentPage: number, totalPages: number, paginationPannel: HTMLUListElement) {
  const createPageItem = (page: number) => {
    const pageItem = document.createElement('li');
    pageItem.innerText = page.toString();
    pageItem.setAttribute('data-page', page.toString());
    paginationPannel.appendChild(pageItem);
    if (page === currentPage) {
      pageItem.classList.add('selected');
    }
  };

  createPageItem(1);
  if (currentPage > 3) {
    paginationPannel.appendChild(document.createElement('span')).innerText = '...';
  }

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      createPageItem(i);
    }
  }

  if (currentPage < totalPages - 2) {
    paginationPannel.appendChild(document.createElement('span')).innerText = '...';
  }
  createPageItem(totalPages);
}
