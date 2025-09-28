import { FormattedUser, StoredUser } from '../types/FormattedUser';
import { findUsers } from './findUsers';

export function findPercentage(
	users: StoredUser[],
	searchBy: 'full_name' | 'note' | 'age',
	searchValue: string | number,
	operator: '>' | '<' | '>=' | '<=' | '=' = '=',
): number {
	return (findUsers(users, searchBy).length / users.length) * 100;
}
