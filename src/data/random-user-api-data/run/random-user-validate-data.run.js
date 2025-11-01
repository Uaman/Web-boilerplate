import usersNormalized from './random-users-normalized.json' with { type: 'json' };
import { userValidateDataAndSave } from '../../util/validate/save-user-validate-data.util.js';

await userValidateDataAndSave(usersNormalized, 'random-users-validated.json', import.meta.url);
