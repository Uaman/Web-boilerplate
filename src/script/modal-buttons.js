const initTeachinderUI = () => {
  const addTeacherModal = document.getElementById('add-teacher-modal');
  const teacherInfoModal = document.getElementById('teacher-info-modal');
  if (!addTeacherModal || !teacherInfoModal) return;

  const addTeacherButtons = Array.from(document.getElementsByClassName('add-teacher-button'));
  const teacherCards = Array.from(document.getElementsByClassName('teacher-card'));
  const closeModalButton = Array.from(document.getElementsByClassName('modal-close-button'));

  const openAddTeacherModal = () => {
    addTeacherModal.style.display = 'block';
  };

  const openTeacherInfoModal = () => {
    teacherInfoModal.style.display = 'block';
  };

  const closeAddTeacherModal = () => {
    addTeacherModal.style.display = 'none';
    teacherInfoModal.style.display = 'none';
  };

  addTeacherButtons.forEach((button) => button.addEventListener('click', openAddTeacherModal));
  teacherCards.forEach((card) => card.addEventListener('click', openTeacherInfoModal));
  closeModalButton.forEach((button) => button.addEventListener('click', closeAddTeacherModal));
};

document.addEventListener('componentsLoaded', initTeachinderUI);
