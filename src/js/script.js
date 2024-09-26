import {additionalUsers, randomUserMock} from "./FE4U-Lab2-mock.js";

const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
}

function generateRandomId() {
    const name = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const value = `${Math.floor(100000000 + Math.random() * 900000000)}`;
    return `${name}${value}`.trim();
}

function mergeUsers(randomUserMock, additionalUsers) {
    return randomUserMock.map((user) => {

        const matchingAdditionalUser = additionalUsers.find((addUser) =>
            addUser.full_name === `${user.name.first} ${user.name.last}`
        );

        let unformatted_id = matchingAdditionalUser?.id ?? user?.id ?? null;
        let user_id;
        if (typeof unformatted_id !== 'string'){
            user_id = `${unformatted_id.name}${unformatted_id.value}`.trim();
        } else{
            user_id = unformatted_id;
        }
        if (user_id === "null") user_id = generateRandomId();
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
            id: user_id,
            favorite: matchingAdditionalUser?.favorite ?? user?.favorite ?? false,
            course: matchingAdditionalUser ? matchingAdditionalUser.course || getRandomCourse() : getRandomCourse(),
            bg_color: matchingAdditionalUser?.bg_color ?? user?.bg_color ?? null,
            note: matchingAdditionalUser?.note ?? user?.note ?? null
        };

        return formattedUser;
    });
}


function validateUser(user) {

    const errors = [];

    function validateStringField(field, fieldName) {
        if (typeof field !== 'string' || field.charAt(0) !== field.charAt(0).toLocaleUpperCase()) {
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
            (filters.favorite !== undefined ? user.favorite === filters.favorite : true) &&
            (filters.hasPhoto !== undefined ? user.picture_large && user.picture_large.trim() !== '' : true)
        );
    });
}

// const filters1 = {
//     country: "Germany",
//     ageMin: 30,
//     ageMax: 70,
//     gender: "male",
//     favorite: true
// };
//
// const filters2 = {
//     ageMin: 40,
//     ageMax: 60,
// };
//
// const filters3 = {
//     country: "France",
// };


function sortUsers(users, sortBy, ascending = true) {

    const usersCopy = JSON.parse(JSON.stringify(users)); // splice

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
//console.log(mergedUsers);


// const validationResults = validateAllUsers(mergedUsers);
// console.log(validationResults);


// const filteredUsers1 = filterUsers(mergedUsers, filters1);
// console.log('Фільтрація 1:', filteredUsers1);
//
// const filteredUsers2 = filterUsers(mergedUsers, filters2);
// console.log('Фільтрація 2:', filteredUsers2);
//
// const filteredUsers3 = filterUsers(mergedUsers, filters3);
// console.log('Фільтрація 3:', filteredUsers3);
//
//
// const sortedByName = sortUsers(mergedUsers, 'full_name', true);
// console.log('Сортування за ім\'ям (зростання):', sortedByName);
//
// const sortedByAgeDesc = sortUsers(mergedUsers, 'age', false);
// console.log('Сортування за віком (спадання):', sortedByAgeDesc);
//
// const sortedByBday = sortUsers(mergedUsers, 'b_date', true);
// console.log('Сортування за датою народження (зростання):', sortedByBday);
//
// const sortedByCountryDesc = sortUsers(mergedUsers, 'country', false);
// console.log('Сортування за країною (спадання):', sortedByCountryDesc);
//
//
// const foundUsersByName = findUsers(mergedUsers, "as");
// console.log('Знайдено користувачів за частковим збігом імені:', foundUsersByName);
//
// const foundUsersByNote = findUsers(mergedUsers, "teacher");
// console.log('Знайдено користувачів за частковим збігом у примітці:', foundUsersByNote);
//
// const foundUsersByAge = findUsers(mergedUsers, "<55");
// console.log('Знайдено користувачів за віком:', foundUsersByAge);
//
//
// const percentageByName = getMatchingPercentage(mergedUsers, "as");
// console.log('Відсоток користувачів за частковим збігом імені:', percentageByName, '%');




let shownUsers = JSON.parse(JSON.stringify(mergedUsers));

function showAddPopup() {
    const popupOverlay = document.getElementById('popup_overlay1');
    popupOverlay.style.visibility = 'visible';
    const popup = document.getElementById('popup-add-teacher');
    popup.style.visibility = 'visible';
}

function hideAddPopup() {
    const popupOverlay = document.getElementById('popup_overlay1');
    popupOverlay.style.visibility = 'hidden';
    const popup = document.getElementById('popup-add-teacher');
    popup.style.visibility = 'hidden';
}

function addNewUser(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const speciality = document.getElementById('speciality').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const bgColor = document.getElementById('bg-color').value;
    const notes = document.getElementById('notes').value;
    const sexElement = document.querySelector('input[name="sex"]:checked');

    if (!name || !speciality || !country || !city || !email || !phone || !dob || !sexElement || !bgColor) {
        alert("Some fields are not filled!");
        return;
    }

    const sex = sexElement.value;

    if (name.trim().split(' ').length !== 2) {
        alert("Name must consist of two words!");
        return;
    }

    const age = calculateAge(dob);

    if (age <= 16) {
        alert("Age must be greater or equal to 16!");
        return;
    }

    const newUser = {
        id: generateRandomId(),
        full_name: name,
        course: speciality,
        city: city,
        country: country,
        age: age,
        gender: sex,
        email: email,
        phone: phone,
        picture_large: null,
        favorite: false,
        bg_color: bgColor,
        note: notes
    };

    if(!validateUser(newUser).valid){
        alert("Email/phone is invalid!");
        return;
    }

    mergedUsers.push(newUser);
    updateFilters();

    sortedUsers = sortUsers(mergedUsers, 'full_name', ascendingOrder);
    currentPage = Math.ceil(mergedUsers.length / itemsPerPage);
    displayUsers(sortedUsers, currentPage);
    setupPagination(sortedUsers);

    document.querySelector('.add-teacher-form').reset();
}

function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}



function showInfoPopup() {

    const card = event.currentTarget;
    const userId = card.getAttribute('data-id');
    const userIndex = mergedUsers.findIndex(user => user.id == userId);
    const userData = mergedUsers[userIndex];

    const popupOverlay = document.getElementById('popup_overlay2');
    popupOverlay.style.visibility = 'visible';
    const popup = document.getElementById('popup-info-teacher');

    popup.querySelector('.d-teacher-name').textContent = userData.full_name;
    popup.querySelector('.d-teacher-subject').textContent = userData.course;
    popup.querySelector('.d-teacher-resides').textContent = `${userData.city}, ${userData.country}`;
    popup.querySelector('.d-teacher-agesex').textContent = `${userData.age}, ${userData.gender}`;
    popup.querySelector('.d-teacher-email').textContent = userData.email;
    popup.querySelector('.d-teacher-phone').textContent = userData.phone;

    if(userData.picture_large) {
        popup.querySelector('.img-div img').src = userData.picture_large;
    } else{
        popup.querySelector('.img-div img').src = '/src/images/avatar.jpg';
    }

    const additionalInfo = popup.querySelector('.additional-info');
    if (userData.note && userData.note.trim() !== '') {
        additionalInfo.textContent = userData.note;
    } else {
        additionalInfo.textContent = 'No additional information provided.';
    }

    const oldFavoriteStar = popup.querySelector('.favorite-star');
    const favoriteStar = oldFavoriteStar.cloneNode(true);
    oldFavoriteStar.replaceWith(favoriteStar);

    if (userData.favorite) {
        favoriteStar.innerHTML = '&#9733;';
    } else {
        favoriteStar.innerHTML = '&#9734;';
    }

    const cardStar = card.querySelector('.star');
    function updateStar(favoriteStar, isFavorite) {
        if (isFavorite) {
            favoriteStar.innerHTML = '&#9733;';
            if(!cardStar) return;
            cardStar.innerHTML = '&#9733;';
        } else {
            favoriteStar.innerHTML = '&#9734;';
            if(!cardStar) return;
            cardStar.innerHTML = '';
        }
    }

    favoriteStar.addEventListener('click', () => {
        userData.favorite = !userData.favorite;
        console.log(userIndex);
        mergedUsers[userIndex] = userData;
        initFavouritesCarousel();
        updateStar(favoriteStar, userData.favorite);
    });
    popup.style.visibility = 'visible';
}

function hideInfoPopup() {
    const popupOverlay = document.getElementById('popup_overlay2');
    popupOverlay.style.visibility = 'hidden';
    const popup = document.getElementById('popup-info-teacher');
    popup.style.visibility = 'hidden';
}

function addTeacherCard(user) {

    const teacherCard = document.createElement('div');
    teacherCard.classList.add('teacher-card');
    teacherCard.setAttribute('data-id', user.id);

    const starDiv = `<div class="star">${user.favorite ? '&#9733;' : ''}</div>`;
    let teacherPhotoContent;

    if (user.picture_large && user.picture_large.trim() !== '') {
        teacherPhotoContent = `<img src="${user.picture_large}" class="teacher-photo-inside">`;
    } else {
        const initials = getInitials(user.full_name);
        teacherPhotoContent = `<div class="initials-placeholder">${initials}</div>`;
    }

    teacherCard.innerHTML = `
        <div class="teacher-photo">
            ${teacherPhotoContent}
        </div>
        <p class="teacher-name first-name">${user.full_name.split(' ')[0]}</p>
        <p class="teacher-name last-name">${user.full_name.split(' ')[1]}</p>
        <p class="teacher-subject">${user.course}</p>
        <p class="teacher-nation">${user.country}</p>
        ${starDiv}
    `;

    const borderColor = user.bg_color ? user.bg_color : 'black';
    teacherCard.style.border = `2px solid ${borderColor}`;

    teacherCard.addEventListener('click', showInfoPopup);
    const teachersGrid = document.getElementById('teachers-grid');
    teachersGrid.appendChild(teacherCard);
}

function getInitials(fullName) {
    const nameParts = fullName.split(' ');
    const firstNameInitial = nameParts[0].charAt(0);
    const lastNameInitial = nameParts[1].charAt(0);
    return `${firstNameInitial}.${lastNameInitial}.`;
}


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

let filters = {};

function updateFilters() {

    document.getElementById('search-bar').value = '';
    filters = {};

    const ageValue = document.getElementById('age').value;
    switch (ageValue) {
        case '16-25':
            filters.ageMin = 16;
            filters.ageMax = 25;
            break;
        case '26-35':
            filters.ageMin = 26;
            filters.ageMax = 35;
            break;
        case '36-45':
            filters.ageMin = 36;
            filters.ageMax = 45;
            break;
        case '46-55':
            filters.ageMin = 46;
            filters.ageMax = 55;
            break;
        case '56-65':
            filters.ageMin = 56;
            filters.ageMax = 65;
            break;
        case '66+':
            filters.ageMin = 66;
            filters.ageMax = 150;
            break;
        default:
            filters.ageMin = 16;
            filters.ageMax = 150;
            break;
    }

    const countryValue = document.getElementById('region').value;
    if (countryValue !== 'Any') {
        filters.country = countryValue;
    }

    const genderValue = document.getElementById('sex').value;
    if (genderValue !== 'Any') {
        filters.gender = genderValue.toLowerCase();
    }

    const hasPhoto = document.getElementById('has-photo').checked;
    if (hasPhoto) {
        filters.hasPhoto = true;
    }

    const favorite = document.getElementById('is-favorite').checked;
    if (favorite) {
        filters.favorite = true;
    }

    shownUsers = filterUsers(mergedUsers, filters);

    const teachersGrid = document.getElementById('teachers-grid');
    while (teachersGrid.firstChild) {
        teachersGrid.removeChild(teachersGrid.firstChild);
    }

    shownUsers.forEach(user => addTeacherCard(user));
}

function searchUsers() {

    const searchBarValue = document.getElementById('search-bar').value.trim();
    clearAllFilters();

    if (searchBarValue === '') {
        shownUsers = JSON.parse(JSON.stringify(mergedUsers));
    } else {
        shownUsers = findUsers(mergedUsers, searchBarValue);
    }

    const teachersGrid = document.getElementById('teachers-grid');
    while (teachersGrid.firstChild) {
        teachersGrid.removeChild(teachersGrid.firstChild);
    }

    shownUsers.forEach(user => addTeacherCard(user));
}

function clearAllFilters() {

    document.getElementById('age').selectedIndex = 0;
    document.getElementById('region').selectedIndex = 0;
    document.getElementById('sex').selectedIndex = 0;
    document.getElementById('has-photo').checked = false;
    document.getElementById('is-favorite').checked = false;
}

const itemsPerPage = 10;
let currentPage = 1;
let ascendingOrder = true;
let sortedUsers = JSON.parse(JSON.stringify(mergedUsers));

function displayUsers(users, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToDisplay = users.slice(startIndex, endIndex);

    const tableBody = document.getElementById('statistics-table-body');
    tableBody.innerHTML = '';

    usersToDisplay.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.full_name}</td>
            <td>${user.course}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>${user.country}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupPagination(users) {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('span');
        pageButton.className = i === currentPage ? 'chosen-page' : 'other-page';
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayUsers(users, currentPage);
            setupPagination(users);
        });
        paginationContainer.appendChild(pageButton);
    }
}

function handleTableHeaderClick(event) {
    const sortBy = event.target.getAttribute('data-sort');
    if (sortBy) {
        ascendingOrder = !ascendingOrder;
        sortedUsers = sortUsers(mergedUsers, sortBy, ascendingOrder);
        currentPage = 1;
        displayUsers(sortedUsers, currentPage);
        setupPagination(sortedUsers);
    }
}

document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', handleTableHeaderClick);
});

function initTable() {
    displayUsers(sortedUsers, currentPage);
    setupPagination(sortedUsers);
}


let currentIndex = 0;
const nVisible = 5;
let favUsers = [];

function displayFavourites() {
    const carousel = document.getElementById('favourites-carousel');
    carousel.innerHTML = '';

    const endIndex = currentIndex + nVisible;
    const usersToDisplay = favUsers.slice(currentIndex, endIndex);

    usersToDisplay.forEach(user => {
        const teacherCard = document.createElement('div');
        teacherCard.classList.add('teacher-card-bottom');
        teacherCard.setAttribute('data-id', user.id);

        let teacherPhotoContent;
        if (user.picture_large && user.picture_large.trim() !== '') {
            teacherPhotoContent = `<img src="${user.picture_large}" alt="${user.full_name}" class="teacher-photo-inside">`;
        } else {
            const initials = getInitials(user.full_name);
            teacherPhotoContent = `<div class="initials-placeholder">${initials}</div>`;
        }

        teacherCard.innerHTML = `
            <div class="teacher-photo">
                ${teacherPhotoContent}
            </div>
            <p class="teacher-name">${user.full_name.split(' ')[0]}</p>
            <p class="teacher-name">${user.full_name.split(' ')[1]}</p>
            <p class="teacher-nation">${user.country}</p>
        `;

        teacherCard.addEventListener('click', showInfoPopup);
        carousel.appendChild(teacherCard);
    });
}


function shiftLeft() {
    if (currentIndex > 0) {
        currentIndex -= 1;
        displayFavourites();
    }
}

function shiftRight() {
    if (currentIndex + nVisible < favUsers.length) {
        currentIndex += 1;
        displayFavourites();
    }
}

function initFavouritesCarousel() {
    favUsers = mergedUsers.filter(user => user.favorite === true);
    displayFavourites();
}

document.getElementById('age').addEventListener('change', updateFilters);
document.getElementById('region').addEventListener('change', updateFilters);
document.getElementById('sex').addEventListener('change', updateFilters);
document.getElementById('has-photo').addEventListener('change', updateFilters);
document.getElementById('is-favorite').addEventListener('change', updateFilters);

window.searchUsers = searchUsers;
window.showAddPopup = showAddPopup;
window.hideAddPopup = hideAddPopup;
window.showInfoPopup = showInfoPopup;
window.hideInfoPopup = hideInfoPopup;
window.addNewTeacher = addNewUser;
window.scrollToSection = scrollToSection;
window.shiftLeft = shiftLeft;
window.shiftRight = shiftRight;

shownUsers.forEach(user => addTeacherCard(user));
initTable();
initFavouritesCarousel();

