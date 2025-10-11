import { isNil, isNull } from 'lodash-es';
import { initials } from '../util/initials.js';
import { splitName } from '../util/split-name.js';

export const createTopTeacherCard = (user) => {
    const pic = !isNull(user?.picture_large)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${user.picture_large}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar"><span>${initials(user.full_name)}</span></div>`;
    const star = user.favorite
        ? `<img class="teacher-star" src="src/static/images/star.svg" alt="teacher-star">`
        : `<img class="teacher-star" style="display: none;" src="src/static/images/star.svg" alt="teacher-star">`;
    const nameParsed = !isNil(user.full_name) ? splitName(user.full_name) : ['no name', 'no name'];

    return `
    <div class="teacher-card" data-id="${user.id}">
      <div class="teacher-avatar-wrapper">
        ${star}
        ${pic}
      </div>
      <div class="teacher-info">
        <div class="teacher-name">
          <p>${nameParsed[0]}</p>
          <p>${nameParsed[1]}</p>
        </div>
        <p class="teacher-subject">${user.course}</p>
        <p class="teacher-country">${user.country}</p>
      </div>
    </div>
  `;
};
