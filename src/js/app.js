// const testModules = require('./test-module');
require('../css/app.css');

document.addEventListener('DOMContentLoaded', () => {
  // Get references to the buttons and the popup
  const addTeacherBtns = document.querySelectorAll('.btn[data-target="add-teacher-popup"]');
  const teacherCards = document.querySelectorAll('.teacher-card');
  const closeAddTeacherPopupBtn = document.getElementById('close-add-teacher-button');
  const closeTeacherInfoPopupBtn = document.getElementById('close-teacher-info-button');
  const addTeacherPopup = document.getElementById('add-teacher-popup');
  const teacherInfoPopup = document.getElementById('teacher-info-popup');

  function showAddTeacherPopup() {
    addTeacherPopup.showModal();
  }

  function showTeacherInfoPopup() {
    teacherInfoPopup.showModal();
  }

  function hideAddTeacherPopup() {
    addTeacherPopup.close();
  }

  function hideTeacherInfoPopup() {
    teacherInfoPopup.close();
  }

  addTeacherBtns.forEach((button) => {
    button.addEventListener('click', showAddTeacherPopup);
  });

  teacherCards.forEach((card) => {
    card.addEventListener('click', showTeacherInfoPopup);
  });

  closeAddTeacherPopupBtn.addEventListener('click', hideAddTeacherPopup);

  closeTeacherInfoPopupBtn.addEventListener('click', hideTeacherInfoPopup);

  const confirmAddBtn = document.getElementById('add-teacher-button');
  confirmAddBtn.addEventListener('click', () => {
    hideAddTeacherPopup();
  });
});
