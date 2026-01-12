import { saveRandomUsers } from '../util/save-random-users.js';

await saveRandomUsers({baseUrl: import.meta.url});
