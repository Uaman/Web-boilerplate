import { usersFilterUtil } from '../../data/util/filter/users-filter.util.js';
import { usersSearchUtil } from '../../data/util/filter/users-search.util.js';

export const fetchUsers = async (activeFilters = {}, activeSearch = '') => {
    let users = (await (await fetch('/api/users')).json()).users.slice();
    users = usersFilterUtil(users, activeFilters);
    return activeSearch.trim() ? usersSearchUtil(users, activeSearch) : users;
};
