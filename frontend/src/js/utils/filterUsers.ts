import {StoredUser} from '../types/FormattedUser';
import {UserFilters} from '../types/UserFilters';

export function filterUsers(users: StoredUser[], filters: UserFilters): StoredUser[] {
  return users.filter((user) =>
    Object.entries(filters).every(([key, value]) => {
      const userValue = user[key];

      if (value === undefined) {
        return true;
      }

      if (key === 'age') {
        if (typeof value === 'number') {
          return userValue === value;
        } else if (typeof value === 'object' && value !== null) {
          const {min, max} = value as { min?: number; max?: number };

          if (min !== undefined && max !== undefined) {
            return userValue >= min && userValue <= max;
          } else if (min !== undefined) {
            return userValue >= min;
          } else if (max !== undefined) {
            return userValue <= max;
          }
        }
      }

      if (typeof value === 'string' && typeof userValue === 'string') {
        return userValue.toLocaleLowerCase() === value.toLocaleLowerCase();
      }

      if (typeof value === 'boolean') {
        return !!userValue;
      }

      return userValue === value;
    }),
  );
}
