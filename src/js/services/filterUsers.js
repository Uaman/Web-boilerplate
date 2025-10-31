//------ Завдання 3.  Підключити до сторінки бібліотеку lodash. Використовуючи її  відрефакторити функції (мапинг, валідація, сортинг, фільтерінг та пошук).   

export function filterUsers(users, filters) {
  // Безпечна перевірка — якщо users не масив
  if (!Array.isArray(users)) return [];

  //return users.filter((u) => { // було 
  return _.filter(users, (u) => { // стало
    // Фільтр за країною
    if (filters.country && u.country !== filters.country) return false;

    // Фільтр за статтю
    if (filters.gender && u.gender !== filters.gender) return false;

    // Фільтр за улюбленими
    if (filters.favorite && !u.favorite) return false;

    // Фільтр лише з фото
    if (filters.withPhoto && !(u.picture_thumbnail || u.picture_large)) return false;

    // Фільтр за віком
    if (filters.age) {
      if (filters.age === "lt30" && !(u.age < 30)) return false;
      if (filters.age === "30-40" && !(u.age >= 30 && u.age <= 40)) return false;
      if (filters.age === "gt40" && !(u.age > 40)) return false;
    }

    return true;
  });
}