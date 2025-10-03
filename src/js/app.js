import '../scss/style.scss';

import { formatUsers } from "./services/formatUsers.js";
import { validateUsers } from "./services/validateUsers.js";
import { filterUsers } from "./services/filterUsers.js";
import { sortUsers } from "./services/sortUsers.js";
import { findUser } from "./services/findUser.js";
import { percentageMatch } from "./services/percentageMatch.js";
import { saveToFile } from "./utils/saveToFile.js";

const users = formatUsers();
saveToFile("users-normalized.json", users);

const validationReport = validateUsers(users);
saveToFile("users-validated.json", validationReport);

const filtered = filterUsers(users, { country: "Germany" });
saveToFile("users-filtered.json", filtered);

const sorted = sortUsers(users, "age", "desc");
saveToFile("users-sorted.json", sorted);

const found = findUser(users, "full_name", "Claude Payne");
saveToFile("user-found.json", found);

const percentOver40 = percentageMatch(users, u => u.age > 40);
saveToFile("users-percentage.json", { percentOver40 });