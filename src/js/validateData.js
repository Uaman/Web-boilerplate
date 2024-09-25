export default {
    teachers: getTeachersList(),
};
import { randomUserMock, additionalUsers } from './data';
import { courses } from './types/Courses';
function formatUser(users) {
    return users.map((user) => ({
        id: generateUUID(),
        gender: user.gender,
        title: user.name.title,
        full_name: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        course: getRandomCourse(),
        favorite: Math.random() < 0.5,
        bg_color: '#FFFFFF',
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }));
}
function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
}
function generateUUID() {
    return Math.floor(Math.random() * 1000000);
}
function mergeUsers(users, additionalUsers) {
    const combinedUsers = [...users, ...additionalUsers];
    const uniqueUsers = combinedUsers.filter((user, index) => {
        const firstIndex = combinedUsers.findIndex(u => u.id === user.id);
        return firstIndex === index;
    });
    return uniqueUsers.map(user => ({
        ...user,
        course: getRandomCourse(),
        note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }));
}
function validateTeachersData(user) {
    console.log(`Validating user ${user.full_name}, ID: ${user.id}`);
    const startsWithUpperCase = (str) => /^[A-Z]/.test(str);
    const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
    if (!validatePhoneNumber(user.phone)) {
        console.log('Invalid phone number');
        return false;
    }
    const stringFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'];
    for (const field of stringFields) {
        if (typeof user[field] !== 'string' || !startsWithUpperCase(user[field])) {
            console.log(`Invalid ${field}`);
            return false;
        }
    }
    if (typeof user.age !== 'number' || user.age < 0) {
        console.log('Invalid age');
        return false;
    }
    if (typeof user.email !== 'string' || !user.email.includes('@')) {
        console.log('Invalid email');
        return false;
    }
    return true;
}
function sortUsers(users, sortBy, direction = 'asc') {
    if (sortBy === undefined)
        return users;
    return users.sort((a, b) => {
        let comparison = 0;
        if (a[sortBy] !== undefined && b[sortBy] !== undefined) {
            if (sortBy === 'full_name' || sortBy === 'country') {
                comparison = a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            }
            else if (sortBy === 'age') {
                comparison = a.age - b.age;
            }
            else if (sortBy === 'b_date') {
                comparison = new Date(a.b_date).getTime() - new Date(b.b_date).getTime();
            }
        }
        return direction === 'asc' ? comparison : -comparison;
    });
}
function filterUsers(users, filters) {
    return users.filter(user => {
        const ageString = filters.age?.toString();
        const [ageStart, ageEnd] = ageString && ageString.includes("-") ? ageString.split("-") : [ageString, ageString];
        if (filters.course && user.course !== filters.course)
            return false;
        if (filters.age !== undefined && !(user.age >= Number(ageStart) && user.age <= Number(ageEnd)))
            return false;
        if (filters.gender && user.gender !== filters.gender)
            return false;
        if (filters.favorite !== undefined && user.favorite !== filters.favorite)
            return false;
        return true;
    });
}
function searchForUser(users, searchBy) {
    return users.filter(user => {
        let ageMatch = true;
        const ageString = searchBy.age?.toString().trim();
        if (ageString !== undefined) {
            const userAge = user.age;
            if (ageString.startsWith(">=")) {
                const ageValue = parseInt(ageString.slice(2).trim());
                ageMatch = userAge >= ageValue;
            }
            else if (ageString.startsWith("<=")) {
                const ageValue = parseInt(ageString.slice(2).trim());
                ageMatch = userAge <= ageValue;
            }
            else if (ageString.startsWith(">")) {
                const ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge > ageValue;
            }
            else if (ageString.startsWith("<")) {
                const ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge < ageValue;
            }
            else if (ageString.startsWith("=")) {
                const ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge === ageValue;
            }
            else {
                const ageValue = parseInt(ageString);
                ageMatch = userAge === ageValue;
            }
        }
        const nameMatch = searchBy.name !== undefined
            ? user.full_name.toLowerCase() === searchBy.name.toLowerCase()
            : true;
        const noteMatch = searchBy.note !== undefined
            ? user.note.toLowerCase().includes(searchBy.note.toLowerCase())
            : true;
        return ageMatch && nameMatch && noteMatch;
    });
}
function calculataeMatchPercentage(users, matchedUsers) {
    return Math.round((matchedUsers.length / users.length) * 100);
}
const formattedUsers = formatUser([...randomUserMock]);
export const mergeUsersResult = mergeUsers(formattedUsers, additionalUsers);
console.log('Formatted and merged users:', mergeUsersResult);
console.log('Validation Results:');
formattedUsers.forEach(user => console.log(validateTeachersData(user)));
const filteredUsers = filterUsers(mergeUsersResult, {
    course: 'Computer Science',
    favorite: true,
    age: 49 - 62,
});
console.log('Filtered users:', filteredUsers);
const sortedUsers = sortUsers(mergeUsersResult, 'full_name', 'asc');
console.log('Sorted users:', sortedUsers);
const searchResults = searchForUser(mergeUsersResult, { age: ">30" });
const matchPercentage = calculataeMatchPercentage(mergeUsersResult, searchResults);
console.log('Search Results:', searchResults);
console.log('Match percentage:', matchPercentage);
function getTeachersList() {
    return mergeUsersResult;
}
//# sourceMappingURL=validateData.js.map