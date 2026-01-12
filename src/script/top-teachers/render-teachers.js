import { createTopTeacherCard } from './create-top-teacher-card.js';

export const renderTeachers = (usersList, teacherAmount, initialIndex = 0) => {
    const container = document.querySelector(".top-teachers-list");
    if (!container) return;
    container.innerHTML = usersList
        .slice(initialIndex * teacherAmount, (initialIndex * teacherAmount) + teacherAmount)
        .map(createTopTeacherCard)
        .join("");
};
