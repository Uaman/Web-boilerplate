import { isNil, isNull } from 'lodash-es';
import { initialsUtil } from '../util/initials.util.js';
import { splitNameUtil } from '../util/split-name.util.js';

export const createFavouriteTeacherCard = (user) => {
    const pic = !isNull(user?.picture_large)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${user.picture_large}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar"><span>${initialsUtil(user.full_name)}</span></div>`;
    const nameParsed = !isNil(user.full_name) ? splitNameUtil(user.full_name) : ['no name', 'no name'];

    return `
    <div class="teacher-card" data-id="${user.id}">
      <div class="teacher-avatar-wrapper">
        ${pic}
      </div>
      <div class="teacher-info">
        <div class="teacher-name">
          <p>${nameParsed[0]}</p>
          <p>${nameParsed[1]}</p>
        </div>
        <p class="teacher-country">${user.country}</p>
      </div>
    </div>
  `;
};
