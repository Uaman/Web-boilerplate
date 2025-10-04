import { StoredUser } from '../types/FormattedUser';
import { fetchRandomApiUsers } from './fetchRandomApiUsers';
import { fetchUsersFromDatabase } from './fetchUsersFromDatabase';

export async function fillDatabaseWithUsers(amount: number): Promise<StoredUser[]> {
  const randomUsers = await fetchRandomApiUsers(amount);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users: randomUsers }),
  };

  try {
    const response = await fetch(`http://localhost:3030/api/user/fill`, requestOptions);
    if (response.ok) {
      return await fetchUsersFromDatabase();
    } else {
      console.error('Failed to send users');
      return [];
    }
  } catch (error) {
    console.error('Error sending users to backend:', error);
    return [];
  }
}
