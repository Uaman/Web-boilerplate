import usersNormalized from './users-normalized.json' with { type: 'json' };
import { userValidateDataAndSave } from '../../util/validate/save-user-validate-data.util.js';

await userValidateDataAndSave(usersNormalized, 'users-validated.json', import.meta.url);
