import { FormattedUser, StoredUser } from '../types/FormattedUser.js';
import { RandomUser } from '../types/RandomUser.js';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatRandomUsers(randomUsers: RandomUser[]): Partial<StoredUser>[] {
	return randomUsers.map((user) => ({
		gender: user.gender,
		title: user.name.title,
		full_name: `${user.name.first} ${user.name.last}`,
		city: user.location.city,
		state: user.location.state,
		country: user.location.country,
		postcode: String(user.location.postcode),
		coordinates: user.location.coordinates,
		timezone: user.location.timezone,
		email: user.email,
		b_day: user.dob.date,
		age: user.dob.age,
		phone: user.phone,
		picture_large: user.picture.large,
		picture_thumbnail: user.picture.thumbnail,
	}));
}

function mergeUsers(
	formattedRandomUsers: Partial<StoredUser>[],
	additionalUsers: Partial<StoredUser>[],
): Partial<StoredUser>[] {
	const combinedUsers = [...formattedRandomUsers, ...additionalUsers];
	const uniqueUsersMap = new Map();

	for (const user of combinedUsers) {
		uniqueUsersMap.set(user.email, user);
	}

	return Array.from(uniqueUsersMap.values());
}

function assignAdditionalFields(users: Partial<FormattedUser>[]): StoredUser[] {
	const courses = [
		'Mathematics',
		'Physics',
		'English',
		'Computer Science',
		'Dancing',
		'Chess',
		'Biology',
		'Chemistry',
		'Law',
		'Art',
		'Medicine',
		'Statistics',
	];

	return users.map((user, index) => ({
		...user,
		gender: capitalizeFirstLetter(user.gender),
		// _id: user.id || `user-${index + 1}`,
		favorite: user.favorite ?? false,
		course: user.course || courses[Math.floor(Math.random() * courses.length)],
		bg_color: user.bg_color || '#ffffff',
		note: user.note || 'Note not provided',
	})) as StoredUser[];
}

export function processUsers(randomUserMock: RandomUser[], additionalUsers: Partial<StoredUser>[] = []): StoredUser[] {
	try {
		const formattedRandomUsers = formatRandomUsers(randomUserMock);
		const mergedUsers = mergeUsers(formattedRandomUsers, additionalUsers);
		const finalUsers = assignAdditionalFields(mergedUsers);

		return finalUsers;
	} catch (error) {
		console.error('An error occurred:', error);
	}
	return [];
}
