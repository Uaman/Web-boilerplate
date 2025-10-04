export function findUser(users, field, value) {
  return users.find((u) => u[field] === value);
}