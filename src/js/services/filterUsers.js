export function filterUsers(users, filters) {
  return users.filter((u) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      return u[key] === value;
    });
  });
}