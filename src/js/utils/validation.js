import { capitalize } from "./capitalize.js";
import { validatePhone } from "./phone.js";

export function validateUser(user) {
  let errors = [];

  ["full_name", "gender", "note", "state", "city", "country"].forEach((field) => {
    if (user[field] && typeof user[field] !== "string") {
      errors.push(`${field} is not a string`);
    }
    if (user[field] && user[field][0] !== user[field][0]?.toUpperCase()) {
      errors.push(`${field} does not start with a capital letter`);
    }
  });

  if (typeof user.age !== "number") {
    errors.push("age is not a number");
  }

  if (!validatePhone(user.phone, user.country)) {
    errors.push(`phone is invalid for ${user.country}`);
  }

  if (!user.email?.includes("@")) {
    errors.push("email is invalid");
  }

  return { isValid: errors.length === 0, errors };
}