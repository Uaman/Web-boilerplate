import { validatePhone } from "../utils/phone.js";
import { courses } from "../utils/courses.js";

function isCapitalized(str) {
  return typeof str === "string" && str[0] === str[0]?.toUpperCase();
}

function isHexColor(str) {
  return /^#[0-9A-F]{6}$/i.test(str);
}

//----- Завдання 3.  Підключити до сторінки бібліотеку lodash. Використовуючи її  відрефакторити функції (мапинг, валідація, сортинг, фільтерінг та пошук).   
export function validateUsers(users) {
  if (!Array.isArray(users)) return [];

  return _.map(users, (u) => {
    const errors = [];

    ["full_name", "gender", "note", "state", "city", "country"].forEach((field) => {
      if (u[field] && typeof u[field] !== "string") {
        errors.push(`${field} is not a string`);
      } else if (u[field] && !isCapitalized(u[field])) {
        errors.push(`${field} does not start with a capital letter`);
      }
    });

    if (typeof u.age !== "number" || isNaN(u.age)) {
      errors.push("age is not a number");
    }

    const phoneCheck = validatePhone(u.phone, u.country);
    if (!phoneCheck.valid) errors.push(phoneCheck.error);

    if (!(typeof u.email === "string" && u.email.includes("@"))) {
      errors.push("email is invalid");
    }

    if (u.course && !courses.includes(u.course)) {
      errors.push("course is not in allowed list");
    }

    if (u.bg_color && !isHexColor(u.bg_color)) {
      errors.push("bg_color is not a valid HEX");
    }

    if (typeof u.favorite !== "boolean") {
      errors.push("favorite must be boolean");
    }

    return {
      ...u,
      phone: phoneCheck.normalized || u.phone,
      isValid: errors.length === 0,
      errors,
    };
  });
}

/* 
export function validateUsers(users) {
  return users.map((u) => {
    const errors = [];

    ["full_name", "gender", "note", "state", "city", "country"].forEach((field) => {
      if (u[field] && typeof u[field] !== "string") {
        errors.push(`${field} is not a string`);
      } else if (u[field] && !isCapitalized(u[field])) {
        errors.push(`${field} does not start with a capital letter`);
      }
    });

    if (typeof u.age !== "number" || isNaN(u.age)) {
      errors.push("age is not a number");
    }

    const phoneCheck = validatePhone(u.phone, u.country);
    if (!phoneCheck.valid) errors.push(phoneCheck.error);

    if (!(typeof u.email === "string" && u.email.includes("@"))) {
      errors.push("email is invalid");
    }

    if (u.course && !courses.includes(u.course)) {
      errors.push("course is not in allowed list");
    }

    if (u.bg_color && !isHexColor(u.bg_color)) {
      errors.push("bg_color is not a valid HEX");
    }

    if (typeof u.favorite !== "boolean") {
      errors.push("favorite must be boolean");
    }

    return {
      ...u,
      phone: phoneCheck.normalized || u.phone,
      isValid: errors.length === 0,
      errors,
    };
  });
}
*/