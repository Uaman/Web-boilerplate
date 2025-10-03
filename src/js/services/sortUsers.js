export function sortUsers(users, field, order = "asc") {
  return [...users].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}