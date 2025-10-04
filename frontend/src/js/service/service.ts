import { renderTable } from '../render/renderTable';
import { renderUsers } from '../render/renderUsers';
import { StoredUser } from '../types/FormattedUser';
import {applyFilters} from "../setUpFilters";
import {applySearch} from "../setUpSearch";

export const GlobalService = (() => {
  let _users: StoredUser[] = [];
  let _displayedUsers: StoredUser[] = [];

  return {
    get users() {
      return _users;
    },
    set users(value: StoredUser[]) {
      console.log('Users array changed!');
      _users = value;
      GlobalService.displayedUsers = value;
    },

    get displayedUsers() {
      return _displayedUsers;
    },
    set displayedUsers(value: StoredUser[]) {
      _displayedUsers = value;
      console.log('Displayed users array changed!');
      renderUsers(GlobalService.displayedUsers);
      renderTable(GlobalService.displayedUsers);
    },
    applyRestrictions() {
      applyFilters();
      applySearch();
    },
  };
})();
