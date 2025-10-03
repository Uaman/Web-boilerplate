export function percentageMatch(users, predicateFn) {
  const matched = users.filter(predicateFn).length;
  return ((matched / users.length) * 100).toFixed(2);
}