function findUser(users, criterion) {
  const [property, value] = Object.entries(criterion)[0];

  return users.find((user) => user[property] === value);
}
