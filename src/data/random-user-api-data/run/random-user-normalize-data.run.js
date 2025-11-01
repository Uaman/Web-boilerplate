import randomUsers from './random-users.json' with { type: 'json' };
import { userNormalizeAndSave } from '../../util/normalize/save-user-normalize-data.util.js';

await userNormalizeAndSave(randomUsers, 'random-users-normalized.json', import.meta.url);
