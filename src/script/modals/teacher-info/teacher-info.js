import { openTeacherInfoModal } from './open-teacher-info-modal.js';
import { renderTeacherInfoModal } from './render-teacher-info-modal.js';

document.addEventListener('components:loaded', openTeacherInfoModal)

document.addEventListener('teacherInfo:open', (e) => {
    renderTeacherInfoModal(e.detail.user);
});
