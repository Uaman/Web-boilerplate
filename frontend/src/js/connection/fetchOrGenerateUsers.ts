import { StoredUser } from '../types/FormattedUser';
import { fetchUsersFromDatabase } from './fetchUsersFromDatabase';
import { fillDatabaseWithUsers } from './fillDatabaseWithUsers';

export async function fetchOrGenerateUsers(amount: number): Promise<StoredUser[]> {
  let users = await fetchUsersFromDatabase();

  if (users.length < amount) {
    console.log(users.length + ' users found in database, generating ' + (amount - users.length) + ' more');
    users = await fillDatabaseWithUsers(amount - users.length);
  }

  return users;
}
