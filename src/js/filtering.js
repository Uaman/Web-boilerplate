function filterUsers(users, criteria) {
  const { country, age, gender, favorite } = criteria;
  return users.filter((user) => {
    if (country && user.country !== country) {
      return false;
    }

    if (age && user.age !== age) {
      return false;
    }

    if (gender && user.gender !== gender) {
      return false;
    }

    if (favorite !== undefined && user.favorite !== favorite) {
      return false;
    }

    return true;
  });
}