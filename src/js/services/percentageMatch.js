export function percentageMatch(users, predicateFn) {
  if (!users.length) return 0;
  const matched = users.filter(predicateFn).length;
  return Math.round((matched / users.length) * 100);
}