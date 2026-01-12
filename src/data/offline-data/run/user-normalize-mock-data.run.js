import { joinMockAndAdditionalUtil } from '../../util/normalize/join-mock-and-additional.util.js';
import { additionalUsers, randomUserMock } from '../FE4U-Lab2-mock.js';
import { userNormalizeAndSave } from '../../util/normalize/save-user-normalize-data.util.js';

await userNormalizeAndSave(joinMockAndAdditionalUtil(randomUserMock, additionalUsers), 'users-normalized.json', import.meta.url);
