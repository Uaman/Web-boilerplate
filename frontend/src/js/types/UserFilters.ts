import { FormattedUser } from './FormattedUser';

export interface UserFilters extends Partial<Pick<FormattedUser, 'country' | 'gender' | 'favorite'>> {
	age?: number | { min?: number; max?: number };
	picture_large?: boolean;
}

export interface SortingUserFilters
	extends Pick<FormattedUser, 'full_name' | 'age' | 'gender' | 'course' | 'country'> {}
