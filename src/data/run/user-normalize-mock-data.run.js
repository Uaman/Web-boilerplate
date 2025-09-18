import { userNormalizeAndSave } from '../util/user-normalize-data.util.js';
import { joinMockAndAdditionalUtil } from '../util/normalize/join-mock-and-additional.util.js';
import { additionalUsers, randomUserMock } from '../FE4U-Lab2-mock.js';

userNormalizeAndSave(joinMockAndAdditionalUtil(randomUserMock, additionalUsers), 'users-normalized.json', import.meta.url);
