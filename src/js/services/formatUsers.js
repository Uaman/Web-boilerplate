import { getRandomCourse } from "../utils/courses.js";
import { capitalize } from "../utils/capitalize.js";
import { normalizePhone } from "../utils/phone.js";

function uuidv4() {
  return crypto.randomUUID();
}

// обчислення віку
export function calculateAge(birthDate) {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

// випадковий колір для аватарок
export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

function capitalizeWords(str) {
  return (str || "")
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

//-------- Завдання 1. Підключити до сторінки бібліотеку leaflet. Додати до картки  викладача розташування, використовуючи координати надані в данних.   
export async function formatUsers(randomUsers = [], additionalUsers = []) {
  const formattedRandomUsers = [];

  for (const u of randomUsers.filter(u => u?.email)) {
    const lat = parseFloat(u.location?.coordinates?.latitude);
    const lon = parseFloat(u.location?.coordinates?.longitude);

    // якщо координати невалідні, просто ставимо null (не викликаємо geocodeCity)
    const coordinates =
      !isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
        ? { latitude: lat, longitude: lon }
        : null;

    formattedRandomUsers.push({
      id: u.login?.uuid || uuidv4(),
      gender: capitalize(u.gender) || "Unknown",
      title: u.name?.title || "",
      full_name: `${capitalize(u.name?.first)} ${capitalize(u.name?.last)}`.trim(),
      city: capitalizeWords(u.location?.city) || "",
      state: capitalizeWords(u.location?.state) || "",
      country: capitalizeWords(u.location?.country) || "",
      postcode: u.location?.postcode ?? "",
      coordinates,
      timezone: u.location?.timezone || null,
      email: u.email || "",
      b_date: u.dob?.date || null,
      age: calculateAge(u.dob?.date),
      phone: normalizePhone(u.phone, u.location?.country) || "",
      picture_large: u.picture?.large || null,
      picture_thumbnail: u.picture?.thumbnail || u.picture?.large || null,
      favorite: false,
      course: getRandomCourse(),
      bg_color: randomColor(),
      note: null,
    });
  }

  const merged = [...formattedRandomUsers];

  for (const u of additionalUsers || []) {
    if (!u?.full_name && !u?.email) continue;

    const existing = merged.find(
      m =>
        (u.email && m.email === u.email) ||
        (u.id && m.id === u.id) ||
        (u.full_name && m.full_name?.toLowerCase() === u.full_name?.toLowerCase())
    );

    const capitalizeOr = (val, fallback = "") => (val ? capitalizeWords(val) : fallback);

    const lat = parseFloat(u.coordinates?.latitude);
    const lon = parseFloat(u.coordinates?.longitude);
    const coordinates =
      !isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
        ? { latitude: lat, longitude: lon }
        : null;

    if (existing) {
      existing.picture_large = u.picture_large || existing.picture_large;
      existing.picture_thumbnail = u.picture_thumbnail || u.picture_large || existing.picture_thumbnail;
      existing.bg_color = u.bg_color || existing.bg_color;
      existing.note = u.note || existing.note;
      existing.course = u.course ? capitalizeWords(u.course) : existing.course || "No course";
      existing.city = capitalizeOr(u.city, existing.city);
      existing.state = capitalizeOr(u.state, existing.state);
      existing.country = capitalizeOr(u.country, existing.country);
      existing.email = u.email || existing.email;
      existing.b_date = u.b_day || existing.b_date;
      existing.age = u.b_day ? calculateAge(u.b_day) : existing.age;
      existing.phone = normalizePhone(u.phone, u.country) || existing.phone || "";
      existing.coordinates = coordinates || existing.coordinates;
    } else {
      merged.push({
        id: u.id || uuidv4(),
        gender: capitalize(u.gender) || "Unknown",
        title: u.title || "",
        full_name: capitalizeWords(u.full_name || "Unknown User"),
        city: capitalizeOr(u.city),
        state: capitalizeOr(u.state),
        country: capitalizeOr(u.country),
        postcode: u.postcode ?? "",
        coordinates,
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
  }

  return merged;
}