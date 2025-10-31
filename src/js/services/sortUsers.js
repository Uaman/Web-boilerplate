export function sortUsers(users, field, order = "asc") {
  /*
  return [...users].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];

    if (field === "b_date") {
      valA = valA ? new Date(valA).getTime() : 0;
      valB = valB ? new Date(valB).getTime() : 0;
    }

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
  */

  //----- Завдання 3.  Підключити до сторінки бібліотеку lodash. Використовуючи її  відрефакторити функції (мапинг, валідація, сортинг, фільтерінг та пошук).   
  // Перевіряємо, чи передано масив
  if (!Array.isArray(users)) return [];

  // Використовуємо _.orderBy для сортування за потрібним полем і напрямком
  return _.orderBy(users, [field], [order]);
}