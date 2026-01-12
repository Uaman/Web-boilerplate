import { renderTeachers } from "./render-teachers.js";
import { renderTeachersPager } from "./render-teachers-pager.js";

export const goToTeachersPage = async (page, currentPage, TEACHERS_AMOUNT, getUsers) => {
    const users = await getUsers();
    const total = Math.max(1, Math.ceil(users.length / TEACHERS_AMOUNT));
    const next = Math.min(Math.max(1, page), total);
    renderTeachers(users, TEACHERS_AMOUNT, next - 1);
    renderTeachersPager(users.length, TEACHERS_AMOUNT, next);
    return next;
};
