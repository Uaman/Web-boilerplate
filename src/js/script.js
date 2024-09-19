import {additionalUsers, randomUserMock} from "./FE4U-Lab2-mock.js";

const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
}

function mergeUsers(randomUserMock, additionalUsers) {
    return randomUserMock.map((user) => {

        const matchingAdditionalUser = additionalUsers.find((addUser) =>
            addUser.full_name === `${user.name.first} ${user.name.last}`
        );

        const formattedUser = {
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
            id: matchingAdditionalUser ? matchingAdditionalUser.id : null,
            favorite: matchingAdditionalUser ? matchingAdditionalUser.favorite : null,
            course: matchingAdditionalUser ? matchingAdditionalUser.course || getRandomCourse() : getRandomCourse(),
            bg_color: matchingAdditionalUser ? matchingAdditionalUser.bg_color : null,
            note: matchingAdditionalUser ? matchingAdditionalUser.note : null,
        };

        return formattedUser;
    });
}


function validateUser(user) {

    const errors = [];

    function validateStringField(field, fieldName) {
        if (typeof field !== 'string' || field.charAt(0) !== field.charAt(0).toUpperCase()) {
            errors.push(`${fieldName} повинно бути рядком і починатися з великої літери.`);
        }
    }

    function validateAge(age) {
        if (typeof age !== 'number') {
            errors.push(`Вік повинен бути числом.`);
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push(`Email має бути у форматі example@example.com.`);
        }
    }

    function validatePhone(phone) {
        const phoneRegex = /^\+?\d+(-\d+)*$/;
        if (!phoneRegex.test(phone)) {
            errors.push(`Номер телефону ${phone} повинен містити тільки цифри та дефіси, може починатися з +.`);
        }
    }
    validateStringField(user.full_name, 'Full name');
    validateStringField(user.gender, 'Gender');
    validateStringField(user.state, 'State');
    validateStringField(user.city, 'City');
    validateStringField(user.country, 'Country');

    validateAge(user.age);
    validateEmail(user.email);
    validatePhone(user.phone);

    if (errors.length > 0) {
        return {
            valid: false,
            errors: errors
        };
    } else {
        return {
            valid: true,
            errors: errors
        };
    }
}

function validateAllUsers(users) {
    return users.map((user, index) => {
        const result = validateUser(user);
        return {
            userIndex: index,
            valid: result.valid,
            errors: result.errors,
            message: result.valid ? 'Valid' : 'Invalid'
        };
    });
}

function filterUsers(users, filters) {
    return users.filter(user => {
        return (
            (filters.country ? user.country === filters.country : true) &&
            (filters.ageMin !== undefined ? user.age >= filters.ageMin : true) &&
            (filters.ageMax !== undefined ? user.age <= filters.ageMax : true) &&
            (filters.gender ? user.gender === filters.gender : true) &&
            (filters.favorite !== undefined ? user.favorite === filters.favorite : true)
        );
    });
}

const filters1 = {
    country: "Germany",
    ageMin: 30,
    ageMax: 70,
    gender: "male",
    favorite: true
};

const filters2 = {
    ageMin: 40,
    ageMax: 60,
};

const filters3 = {
    country: "France",
};


function sortUsers(users, sortBy, ascending = true) {

    const usersCopy = JSON.parse(JSON.stringify(users));

    return usersCopy.sort((a, b) => {
        let comparison = 0;

        if (typeof a[sortBy] === 'string') {
            comparison = a[sortBy].localeCompare(b[sortBy]);
        }

        else if (typeof a[sortBy] === 'number') {
            comparison = a[sortBy] - b[sortBy];
        }

        return ascending ? comparison : -comparison;
    });
}

function findUsers(users, searchParam) {
    return users.filter(user => {
        if (typeof searchParam === 'string' && /^[><=]\d+$/.test(searchParam)) {
            const operator = searchParam[0];
            const value = parseInt(searchParam.slice(1), 10);
            if (operator === '>') {
                return user.age > value;
            } else if (operator === '<') {
                return user.age < value;
            } else if (operator === '=') {
                return user.age === value;
            }
        } else if (typeof searchParam === 'string') {
            return (
                (user.full_name && user.full_name.includes(searchParam)) ||
                (user.note && user.note.includes(searchParam))
            );
        } else if (typeof searchParam === 'number') {
            return user.age === searchParam;
        }

        return false;
    });
}

function getMatchingPercentage(users, searchParam) {

    const matchingUsers = findUsers(users, searchParam);

    const percentage = (matchingUsers.length / users.length) * 100;

    return percentage.toFixed(2);
}


const mergedUsers = mergeUsers(randomUserMock, additionalUsers);
console.log(mergedUsers);


const validationResults = validateAllUsers(mergedUsers);
console.log(validationResults);


const filteredUsers1 = filterUsers(mergedUsers, filters1);
console.log('Фільтрація 1:', filteredUsers1);

const filteredUsers2 = filterUsers(mergedUsers, filters2);
console.log('Фільтрація 2:', filteredUsers2);

const filteredUsers3 = filterUsers(mergedUsers, filters3);
console.log('Фільтрація 3:', filteredUsers3);


const sortedByName = sortUsers(mergedUsers, 'full_name', true);
console.log('Сортування за ім\'ям (зростання):', sortedByName);

const sortedByAgeDesc = sortUsers(mergedUsers, 'age', false);
console.log('Сортування за віком (спадання):', sortedByAgeDesc);

const sortedByBday = sortUsers(mergedUsers, 'b_date', true);
console.log('Сортування за датою народження (зростання):', sortedByBday);

const sortedByCountryDesc = sortUsers(mergedUsers, 'country', false);
console.log('Сортування за країною (спадання):', sortedByCountryDesc);


const foundUsersByName = findUsers(mergedUsers, "as");
console.log('Знайдено користувачів за частковим збігом імені:', foundUsersByName);

const foundUsersByNote = findUsers(mergedUsers, "teacher");
console.log('Знайдено користувачів за частковим збігом у примітці:', foundUsersByNote);

const foundUsersByAge = findUsers(mergedUsers, "<55");
console.log('Знайдено користувачів за віком:', foundUsersByAge);


const percentageByName = getMatchingPercentage(mergedUsers, "as");
console.log('Відсоток користувачів за частковим збігом імені:', percentageByName, '%');