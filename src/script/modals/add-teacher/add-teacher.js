import { yearsPassedUtil } from '../../../data/util/helper/years-passed.util.js';
import { populateCountryOptions } from './populate-country-options.js';
import { populateCourseOptions } from './populate-course-options.js';
import { UserDataClass } from '../../../data/class/user-data.class.js';
import { addTeacher } from '../../../api-mock/requests/add-teacher.mock-request.js';

document.addEventListener("components:loaded", () => {
    const modal = document.getElementById("add-teacher-modal");
    const form = modal?.querySelector(".add-teacher-form");
    if (!modal || !form) return;

    populateCountryOptions();
    populateCourseOptions();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dob = form["teacher-dob"].value;
        const age = dob ? yearsPassedUtil(new Date(dob)) : "";
        const color = form["teacher-color"]?.value || "#cccccc";

        const userData = new UserDataClass({
            full_name: form["teacher-name"].value.trim(),
            course: form["teacher-speciality"].value,
            country: form["teacher-country"].value,
            city: form["teacher-city"].value,
            email: form["teacher-email"].value.trim(),
            phone: form["teacher-phone"].value.trim(),
            gender: form["teacher-sex"].value,
            note: form["teacher-notes"].value.trim(),
            bg_color: color,
            age,
        });

        try {
            await addTeacher(userData);
            modal.style.display = "none";
            form.reset();
            document.dispatchEvent(new CustomEvent("teacher:added", { detail: resp.user }));
        } catch (err) {
            console.error(err);
        }
    });
});
