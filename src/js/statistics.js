const { randomUserMock } = require("./FE4U-Lab2-mock");

function getUserStatistics(users, property, condition) {
  const passedCheck = users.filter((user) => condition(user[property]));
  const percentage = passedCheck.length / users.length * 100;

  return `${percentage}%`;
}

