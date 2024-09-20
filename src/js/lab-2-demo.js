const { randomUserMock, additionalUsers } = require("./FE4U-Lab2-mock");
const { formatUser } = require("./format-user");

for (const user of randomUserMock) {
  console.log(formatUser(user));
}
