import {StoredUser} from '../types/FormattedUser';
import {RandomUser} from '../types/RandomUser';
import {processUsers} from '../utils/formatUsers';
import {isValidUser} from '../utils/validateUsers';

export async function fetchRandomApiUsers(amount: number): Promise<StoredUser[]> {
  try {
    const response = await fetch(`https://randomuser.me/api?results=${amount}`);
    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      const formattedUsers = processUsers(results as RandomUser[]);
      return formattedUsers.filter(isValidUser);
    } else {
      console.error('Error fetching users:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
