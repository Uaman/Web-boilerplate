import { fetchOrGenerateUsers } from '../connection/fetchOrGenerateUsers';

export function handleLoadingMoreUsers(): void {
  const loadMoreButton = document.getElementById('load-more-teachers');

  if (!loadMoreButton) {
    console.error('Load more button not found');
    return;
  }

  loadMoreButton.addEventListener('click', () => {
    fetchOrGenerateUsers(10);
  });
}
