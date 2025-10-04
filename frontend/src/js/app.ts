import { fetchOrGenerateUsers } from './connection/fetchOrGenerateUsers';
import { handleAddUsersPopup } from './events/handleAddUsersPopup';
import { handleLoadingMoreUsers } from './events/handleLoadingMoreUsers';
import { handleUserInfoPopup } from './events/handleUserInfoPopup';
import { setUpFilters } from './setUpFilters';
import { setUpHorizontalScroll } from './setUpHorizontalScroll';
import { setUpSearch } from './setUpSearch';
import { setUpSorting } from './setUpSorting';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', async () => {
  await fetchOrGenerateUsers(50);

  initializeUI();
});

export function initializeUI(): void {
  setUpHorizontalScroll();
  handleUserInfoPopup();
  handleAddUsersPopup();
  handleLoadingMoreUsers();
  setUpFilters();
  setUpSorting();
  setUpSearch();
}
