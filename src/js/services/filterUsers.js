export function filterUsers(users, filters) {
  return users.filter((u) => {

    if (filters.country && u.country !== filters.country) return false;
    if (filters.gender && u.gender !== filters.gender) return false;

    if (filters.favorite && !u.favorite) return false;

    if (filters.withPhoto && !(u.picture_thumbnail || u.picture_large)) return false;

    if (filters.age) {
      if (filters.age === "lt30" && !(u.age < 30)) return false;
      if (filters.age === "30-40" && !(u.age >= 30 && u.age <= 40)) return false;
      if (filters.age === "gt40" && !(u.age > 40)) return false;
    }

    return true;
  });
}