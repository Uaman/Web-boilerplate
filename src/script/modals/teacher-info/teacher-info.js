import { openTeacherInfoModal } from './open-teacher-info-modal.js';
import { renderTeacherInfoModal } from './render-teacher-info-modal.js';
import { CustomEvents } from '../../events.js';

document.addEventListener(CustomEvents['components:loaded'], openTeacherInfoModal);

document.addEventListener(CustomEvents['teacherInfo:open'], async (e) => {
    await renderTeacherInfoModal(e.detail.user);
});
