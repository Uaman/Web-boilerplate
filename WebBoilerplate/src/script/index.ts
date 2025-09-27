const initTeachinderUI = (): void => {
    const addTeacherModal = document.getElementById('add-teacher-modal') as HTMLElement | null;
    const teacherInfoModal = document.getElementById('teacher-info-modal') as HTMLElement | null;

    if (!addTeacherModal || !teacherInfoModal) return;

    const addTeacherButtons: HTMLElement[] = Array.from(
        document.getElementsByClassName('add-teacher-button') as HTMLCollectionOf<HTMLElement>
    );

    const teacherCards: HTMLElement[] = Array.from(
        document.getElementsByClassName('teacher-card') as HTMLCollectionOf<HTMLElement>
    );

    const closeModalButtons: HTMLElement[] = Array.from(
        document.getElementsByClassName('modal-close-button') as HTMLCollectionOf<HTMLElement>
    );

    const openAddTeacherModal = (): void => {
        addTeacherModal.style.display = 'block';
    };

    const openTeacherInfoModal = (): void => {
        teacherInfoModal.style.display = 'block';
    };

    const closeAddTeacherModal = (): void => {
        addTeacherModal.style.display = 'none';
        teacherInfoModal.style.display = 'none';
    };

    addTeacherButtons.forEach((button: HTMLElement) =>
        button.addEventListener('click', openAddTeacherModal)
    );

    teacherCards.forEach((card: HTMLElement) =>
        card.addEventListener('click', openTeacherInfoModal)
    );

    closeModalButtons.forEach((button: HTMLElement) =>
        button.addEventListener('click', closeAddTeacherModal)
    );
};

document.addEventListener('componentsLoaded', initTeachinderUI as EventListener);