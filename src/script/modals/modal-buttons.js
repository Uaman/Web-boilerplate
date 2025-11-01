import { CustomEvents } from '../events.js';

document.addEventListener(CustomEvents['components:loaded'], () => {
    const addTeacherModal = document.getElementById('add-teacher-modal');
    const teacherInfoModal = document.getElementById('teacher-info-modal');
    const addTeacherButtons = Array.from(document.getElementsByClassName('add-teacher-button'));
    const closeModalButtons = Array.from(document.getElementsByClassName('modal-close-button'));

    const openAddTeacherModal = () => {
        addTeacherModal.style.display = 'block';
    };

    const closeAllModals = () => {
        addTeacherModal.style.display = 'none';
        teacherInfoModal.style.display = 'none';
    };

    addTeacherButtons.forEach((button) => button.addEventListener('click', openAddTeacherModal));
    closeModalButtons.forEach((button) => button.addEventListener('click', closeAllModals));
});
