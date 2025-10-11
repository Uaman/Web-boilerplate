import { createTeacherInfoModal } from './create-teacher-info-modal.js';
import { changeFavourite } from '../../../api-mock/requests/change-favourite.mock-request.js';

export const renderTeacherInfoModal = (user) => {
    const modal = document.querySelector('.teacher-info-modal-body');
    modal.innerHTML = createTeacherInfoModal(user);
    const favBtn = modal.querySelector('#mark-favourite');
    if (favBtn) {
        favBtn.addEventListener('click', async () => {
            const newValue = !user.favorite;

            try{
                await changeFavourite(user.id, newValue);
                user.favorite = newValue;
                renderTeacherInfoModal();
                document.dispatchEvent(new CustomEvent('user:favouriteChanged', { detail: { id: user.id, value: newValue } }));
            } catch(err) {
                console.error(err);
            }
        });
    }
};
