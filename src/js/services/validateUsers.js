import { validatePhone } from "../utils/phone.js";

function isCapitalized(str) {
  return typeof str === "string" && str[0] === str[0]?.toUpperCase();
}

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
    if (!phoneCheck.valid) {
      errors.push(phoneCheck.error);
    }

    if (!(typeof u.email === "string" && u.email.includes("@"))) {
      errors.push("email is invalid");
    }

    return {
      ...u,
      phone: phoneCheck.normalized || u.phone,
      isValid: errors.length === 0,
      errors
    };
  });
}