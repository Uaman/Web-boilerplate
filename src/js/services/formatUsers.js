import { randomUserMock, additionalUsers } from "../data/FE4U-Lab2-mock.js";
import { getRandomCourse } from "../utils/courses.js";
import { capitalize } from "../utils/capitalize.js";
import { normalizePhone } from "../utils/phone.js";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

function calculateAge(birthDate) {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) {
    age--;
  }
  return age;
}

export function formatUsers() {
  const formattedRandomUsers = randomUserMock.map((u) => ({
    id: u.login?.uuid || uuidv4(),
    gender: capitalize(u.gender),
    title: u.name?.title || "",
    full_name: `${capitalize(u.name?.first)} ${capitalize(u.name?.last)}`,
    city: capitalize(u.location?.city) || "",
    state: capitalize(u.location?.state) || "",
    country: capitalize(u.location?.country) || "",
    postcode: u.location?.postcode,
    coordinates: u.location?.coordinates,
    timezone: u.location?.timezone,
    email: u.email,
    b_date: u.dob?.date,
    age: calculateAge(u.dob?.date),
    phone: normalizePhone(u.phone, u.location?.country),
    picture_large: u.picture?.large,
    picture_thumbnail: u.picture?.thumbnail,
    favorite: false,
    course: getRandomCourse(),
    bg_color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    note: null,
  }));

  const merged = [...formattedRandomUsers];

  additionalUsers.forEach((u) => {
    const exists = merged.find(
      (m) => m.email === u.email || m.id === u.id
    );
    if (!exists) {
      merged.push({
        id: u.id || uuidv4(),
        gender: capitalize(u.gender),
        title: u.title || "",
        full_name: u.full_name,
        city: capitalize(u.city) || "",
        state: capitalize(u.state) || "",
        country: capitalize(u.country) || "",
        postcode: u.postcode,
        coordinates: u.coordinates,
        timezone: u.timezone,
        email: u.email || "",
        b_date: u.b_day || null,
        age: calculateAge(u.b_day),
        phone: normalizePhone(u.phone, u.country),
        picture_large: u.picture_large || null,
        picture_thumbnail: u.picture_thumbnail || null,
        favorite: u.favorite ?? false,
        course: u.course || getRandomCourse(),
        bg_color:
          u.bg_color || "#" + Math.floor(Math.random() * 16777215).toString(16),
        note: u.note || null,
      });
    }
  });

  return merged;
}