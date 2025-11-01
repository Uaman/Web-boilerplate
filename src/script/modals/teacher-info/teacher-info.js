import { openTeacherInfoModal } from './open-teacher-info-modal.js';
import { renderTeacherInfoModal } from './render-teacher-info-modal.js';
import { CustomEvents } from '../../events.js';

document.addEventListener(CustomEvents['components:loaded'], openTeacherInfoModal);

document.addEventListener(CustomEvents['teacherInfo:open'], (e) => {
    renderTeacherInfoModal(e.detail.user);
});
