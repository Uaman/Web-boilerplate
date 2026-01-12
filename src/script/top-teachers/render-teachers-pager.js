import { renderPager } from '../util/pager.util.js';

export const renderTeachersPager = (usersLength, teachersPerPage, currentPage) =>
    renderPager(usersLength, teachersPerPage, currentPage, ".top-teachers-navigation");
