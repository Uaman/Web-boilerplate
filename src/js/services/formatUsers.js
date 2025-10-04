import { randomUserMock, additionalUsers } from "../data/FE4U-Lab2-mock.js";
import { getRandomCourse } from "../utils/courses.js";
import { capitalize } from "../utils/capitalize.js";
import { normalizePhone } from "../utils/phone.js";

function uuidv4() {
  return crypto.randomUUID();
}

export function calculateAge(birthDate) {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

export function randomColor() {
  return (
    "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
  );
}

function capitalizeWords(str) {
  return (str || "")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

export function formatUsers() {
  const formattedRandomUsers = randomUserMock
    .filter((u) => u.email)
    .map((u) => ({
      id: u.login?.uuid || uuidv4(),
      gender: capitalize(u.gender) || "Unknown",
      title: u.name?.title || "",
      full_name: `${capitalize(u.name?.first)} ${capitalize(u.name?.last)}`,
      city: capitalizeWords(u.location?.city) || "",
      state: capitalizeWords(u.location?.state) || "",
      country: capitalizeWords(u.location?.country) || "",
      postcode: u.location?.postcode || "",
      coordinates: u.location?.coordinates || null,
      timezone: u.location?.timezone || null,
      email: u.email,
      b_date: u.dob?.date || null,
      age: calculateAge(u.dob?.date),
      phone: normalizePhone(u.phone, u.location?.country) || "",
      picture_large: u.picture?.large || null,
      picture_thumbnail: u.picture?.thumbnail || u.picture?.large || null,
      favorite: false,
      course: getRandomCourse(),
      bg_color: randomColor(),
      note: null,
    }));

  const merged = [...formattedRandomUsers];

  additionalUsers.forEach((u) => {
    if (!u.full_name && !u.email) return;

    const existing = merged.find(
      (m) =>
        (u.email && m.email === u.email) ||
        (u.id && m.id === u.id) ||
        (u.full_name &&
          m.full_name?.toLowerCase() === u.full_name?.toLowerCase())
    );

    if (existing) {
      existing.picture_large = u.picture_large || existing.picture_large;
      existing.picture_thumbnail =
        u.picture_thumbnail || u.picture_large || existing.picture_thumbnail;
      existing.bg_color = u.bg_color || existing.bg_color;
      existing.note = u.note || existing.note;
      existing.course =
        u.course ? capitalizeWords(u.course) : existing.course || "No course";
      existing.city = capitalizeWords(u.city) || existing.city;
      existing.state = capitalizeWords(u.state) || existing.state;
      existing.country = capitalizeWords(u.country) || existing.country;
      existing.email = u.email || existing.email;
      existing.b_date = u.b_day || existing.b_date;
      existing.age = u.b_day ? calculateAge(u.b_day) : existing.age;
      existing.phone =
        normalizePhone(u.phone, u.country) || existing.phone || "";
    } else {
      merged.push({
        id: u.id || uuidv4(),
        gender: capitalize(u.gender) || "Unknown",
        title: u.title || "",
        full_name: capitalizeWords(u.full_name || "Unknown User"),
        city: capitalizeWords(u.city) || "",
        state: capitalizeWords(u.state) || "",
        country: capitalizeWords(u.country) || "",
        postcode: u.postcode || "",
        coordinates: u.coordinates || null,
        timezone: u.timezone || null,
        email: u.email || "",
        b_date: u.b_day || null,
        age: u.b_day ? calculateAge(u.b_day) : null,
        phone: normalizePhone(u.phone, u.country) || "",
        picture_large: u.picture_large || null,
        picture_thumbnail: u.picture_thumbnail || u.picture_large || null,
        favorite: false,
        course: u.course ? capitalizeWords(u.course) : "No course",
        bg_color: u.bg_color || randomColor(),
        note: u.note || null,
      });
    }
  });

  return merged;
}