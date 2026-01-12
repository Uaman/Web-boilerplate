import { courses } from '../../../data/util/helper/get-random-course.util.js';

export const populateCourseOptions = () => {
    const container = document.querySelector("#teacher-speciality");
    if (!container) return;
    const options = courses.map(c => `<option value="${c}">${c}</option>`);
    if (!options) return;
    container.innerHTML = options.join('');
};
