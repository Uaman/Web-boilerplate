import { createTopTeacherCard } from './create-top-teacher-card.js';

export const renderTeachers = (usersList, TEACHERS_AMOUNT) => {
    const container = document.querySelector(".top-teachers-list");
    if (!container) return false;
    container.innerHTML = usersList
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, TEACHERS_AMOUNT)
        .map(createTopTeacherCard)
        .join("");

    return true;
};
