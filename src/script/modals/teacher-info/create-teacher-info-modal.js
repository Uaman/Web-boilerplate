import { isNull } from 'lodash-es';
import { daysToBD } from '../../util/days-to-bd.util.js';

export const createTeacherInfoModal = (user) => {
    const pic = !isNull(user?.picture_large)
        ? `<img src="${user.picture_large}" alt="teacher-photo-modal" class="teacher-photo-modal">`
        : `<div class="teacher-photo-modal">no photo</div>`;
    const email = !isNull(user.email)
        ? `<a href="mailto:${user.email}">${user.email}</a>`
        : `<span>no email</span>`;
    const favouriteButton = user.favorite
        ? `<button class="standard-button" id="mark-favourite" type="button">Unmark favourite</button>`
        : `<button class="standard-button" id="mark-favourite" type="button">Mark favourite</button>`;

    return `
    <div class="teacher-card-modal-wrapper">
        ${pic}
        <div class="teacher-info-modal-wrapper">
            <div class="teacher-name">
                ${user.full_name}
            </div>
            <p class="teacher-subject-modal">${user.course}</p>
            <p>${user.city}, ${user.country}</p>
            <p>${user?.age ?? 'no age'}, ${daysToBD(user.b_date)} days to BD</p>
            <p>${user.gender}</p>
            ${email}
            <p>${user?.phone ?? 'no phone'}</p>
        </div>
    </div>
    <p class="teacher-info-modal-description">${user?.note ?? ''}</p>
    <div class="teacher-info-wrapper-bottom">
        <a href="#" class="toggle-map-modal">toggle map</a>
        ${favouriteButton}
    </div>
`;
};
