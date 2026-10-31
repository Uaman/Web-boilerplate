import testModules from './test-module.js';
import { randomUserMock, additionalUsers } from './mock.js';

console.log(testModules.hello);
console.log("Random User Mock:", randomUserMock);
console.log("Additional Users:", additionalUsers);

// Selecting DOM elements
const favoritesGrid = document.querySelector('.favorites-grid');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const tableHeaders = document.querySelectorAll('.statistics-table th');
const paginationContainer = document.querySelector('.pagination');
const filtersContainer = document.querySelector('.filters');
const ageFilter = document.querySelector('#filter-age');
const regionFilter = document.querySelector('#filter-region');
const sexFilter = document.querySelector('#sex-filter');
const photoFilter = document.querySelector('#with-photo-filter');
const favoriteFilter = document.querySelector('#favorite-filter');
const teacherList = document.querySelector('.teacher-list');

// popup information
const popup = document.querySelector('.teacher-info-popup');
const closePopupBtn = popup.querySelector('.close-button');
const addTeacherPopup = document.querySelector('.add-teacher-popup');
const closeAddPopupBtn = addTeacherPopup.querySelector('.close-button');
const addTeacherBtns = document.querySelectorAll('.add-teacher-button');

// popup elements
const popupImg = popup.querySelector('.teacher-info-img');
const popupName = popup.querySelector('.name-row h3');
const popupSpeciality = popup.querySelector('.speciality');
const popupLocation = popup.querySelector('.location');
const popupAgeSex = popup.querySelector('.age-sex');
const popupEmail = popup.querySelector('.email-link');
const popupPhone = popup.querySelector('.phone');
const popupDescription = popup.querySelector('.teacher-description');
const showMoreBtn = document.querySelector('.show-more-btn');

// Initializing variables
let visibleCount = 10;
let currentFilteredUsers = [];
let finalUsers = [];
let mapInstance = null;
let statisticsChartInstance = null;
let webDataRocksInstance = null;

// scroll functionality
const scrollAmount = 240;

leftArrow.addEventListener('click', () => {
    favoritesGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
    favoritesGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

const coursesList = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

function formatUser(user) {
    return {
        gender: user.gender,
        title: user.name.title,
        full_name: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: {
            latitude: user.location.coordinates.latitude,
            longitude: user.location.coordinates.longitude,
        },
        timezone: {
            offset: user.location.timezone.offset,
            description: user.location.timezone.description,
        },
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        
        id: user.login.uuid,
        favorite: false,    
        bg_color: '#ffffff', 
        note: "Empty",          
        
        course: coursesList[Math.floor(Math.random() * coursesList.length)],
    };
}

function mergeTeachers(users, additionalUsers) {
    const formattedUsers = _.map(users, formatUser);
    const allUsers = _.concat(formattedUsers, additionalUsers);

    return _.uniqWith(allUsers, (a, b) => 
        (a.email && b.email && a.email === b.email) || (a.full_name === b.full_name)
    );
}

// returning the errors
function getUserValidationErrors(user) {
    const errors = [];

    if (!_.isNumber(user.age) || _.isNaN(user.age) || !_.inRange(user.age, 18, 101)) {
        errors.push("Incorrect age. Age must be a number between 18 and 100");
    }

    if (!_.includes(user.email, "@")) {
        errors.push("Email must contain @");
    }

    if (!isCapitalized(user.full_name)) errors.push("Full name must be capitalized");
    if (!isCapitalized(user.gender)) errors.push("Gender must be capitalized");
    if (!isCapitalized(user.city)) errors.push("City must be capitalized");
    if (!isCapitalized(user.country)) errors.push("Country must be capitalized");
    if (!isCapitalized(user.note)) errors.push("Note must be capitalized");

    if (!/^[0-9\+\-\s\(\)]+$/.test(user.phone)) {
        errors.push("Phone number is invalid");
    }

    return errors;
}

function isValidUser(user) {
    return _.isEmpty(getUserValidationErrors(user));
}

function isCapitalized(str) {
    if (!_.isString(str) || _.isEmpty(str)) return false;
    return _.upperFirst(str) === str;
}

function filterUsers(users, params) {
    return _.filter(users, params);
}

function sortUsers(users, key, order = 'asc') {
    return _.orderBy(users, [user => {
        const val = _.get(user, key);
        return _.isString(val) ? val.toLowerCase() : val;
    }], [order]);
}

function findUser(users, key, value) {
    return _.find(users, user => {
        const val = _.get(user, key);
        if (_.isString(val) && _.isString(value)) {
            return _.includes(_.toLower(val), _.toLower(value));
        }
        return val === value;
    });
}

function getPercentage(users, key, value){
    const filteredCount = _.filter(users, user => user[key] === value).length;
    return Math.round((filteredCount / users.length) * 100);
}

// Search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchValue = searchInput.value;
    let foundTeacher;
    foundTeacher = findUser(finalUsers, 'full_name', searchValue);
    if (!foundTeacher){
        foundTeacher = findUser(finalUsers, 'note', searchValue);
    }
    if (!foundTeacher){
        foundTeacher = findUser(finalUsers, 'age', parseInt(searchValue));
    }
    if (!foundTeacher){
        foundTeacher = findUser(finalUsers, 'country', searchValue);
    }
    if(!foundTeacher){
        foundTeacher = findUser(finalUsers, 'course', searchValue);
    }

    if (foundTeacher) {
        openTeacherPopup(foundTeacher);
    } else {
        console.log('Teacher not found');
    }
});

const popupStarBtn = popup.querySelector('.star-button');
let currentPopupTeacher = null;

// teacher popups
async function openTeacherPopup(teacher) {
    currentPopupTeacher = teacher;

    popup.classList.add('active');

    const daysUntilBirthday = getDaysUntilBirthday(teacher.b_date);
    const daysBeforeBirthdayText = daysUntilBirthday !== null ? `${daysUntilBirthday} days until birthday` : 'Birthday date not available';

    popupName.textContent = teacher.full_name; 
    popupImg.src = teacher.picture_large;      
    popupSpeciality.textContent = teacher.course;
    popupEmail.href = `mailto:${teacher.email}`;
    popupLocation.textContent = `${teacher.city || ''}, ${teacher.state || ''}, ${teacher.country || ''}`;

    popupAgeSex.textContent = `${teacher.age || ''}, ${teacher.gender || ''}${daysBeforeBirthdayText ? ` (${daysBeforeBirthdayText})` : ''}`;
    popupEmail.textContent = teacher.email;
    popupPhone.textContent = teacher.phone;
    popupDescription.textContent = teacher.note;
    popupStarBtn.textContent = teacher.favorite ? '★' : '☆';

    const searchQuery = [teacher.city, teacher.country].filter(Boolean).join(', ');

    let latitude = NaN;
    let longitude = NaN;

    if (searchQuery) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                latitude = parseFloat(data[0].lat);
                longitude = parseFloat(data[0].lon);
            }
        } catch (error) {
            console.warn('Error geocoding, returning default coordinates:', error);
        }
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        latitude = 50.4501;
        longitude = 30.5234;
    }

    if (mapInstance) {
        mapInstance.remove();
    }

    const map = L.map('map').setView([latitude, longitude], 11);
    mapInstance = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`${teacher.full_name} (${teacher.city || teacher.country})`)
        .openPopup();

    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

popupStarBtn.addEventListener('click', () => {
    if (!currentPopupTeacher) return;

    currentPopupTeacher.favorite = !currentPopupTeacher.favorite;
    saveFavoritesToStorage();

    popupStarBtn.textContent = currentPopupTeacher.favorite ? '★' : '☆';

    renderTeachers(finalUsers);
    renderFavorites(finalUsers);
});

// Close popup 
closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('active');
});

addTeacherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addTeacherPopup.classList.add('active');
    });
});

closeAddPopupBtn.addEventListener('click', () => {
    addTeacherPopup.classList.remove('active');
});

// Sorting functionality
let currentSortColumn = null;
let currentSortOrder = 'asc';

tableHeaders.forEach(th => {
    th.addEventListener('click', () => {
        const key = th.getAttribute('data-key');
        if (!key) return;

        if (currentSortColumn === key) {
            currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortColumn = key;
            currentSortOrder = 'asc'; 
        }

        tableData = sortUsers(tableData, key, currentSortOrder);
        displayTablePage(1);
    });
});

// Pagination functionality
const usersPerPage = 10;
let currentPage = 1;
let tableData = [...finalUsers];

function displayTablePage(page) {
    currentPage = page;
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = tableData.slice(startIndex, endIndex);
    
    renderStatistics(paginatedUsers);
    updatePaginationButtons();
}

function updatePaginationButtons() {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(tableData.length / usersPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('a');
        btn.href = '#';
        btn.textContent = i;
        
        if (i === currentPage) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', (event) => {
            event.preventDefault(); 
            displayTablePage(i);
        });
        
        paginationContainer.appendChild(btn);
    }
}

// filter functionality
if (filtersContainer) {
    filtersContainer.addEventListener('change', () => {
        let filteredUsers = [...finalUsers];

        if (sexFilter.value !== 'All') {
            filteredUsers = _.filter(filteredUsers, user => 
                _.toLower(user.gender) === _.toLower(sexFilter.value)
            );
        }

        if (photoFilter.checked) {
            filteredUsers = _.filter(filteredUsers, user => !_.isEmpty(user.picture_large));
        }

        if (favoriteFilter.checked) {
            filteredUsers = _.filter(filteredUsers, { favorite: true });
        }

        const ageVal = ageFilter.value;
        if (ageVal === '18-31') {
            filteredUsers = _.filter(filteredUsers, u => _.inRange(u.age, 18, 32));
        } else if (ageVal === '32-40') {
            filteredUsers = _.filter(filteredUsers, u => _.inRange(u.age, 32, 41));
        } else if (ageVal === '41-50') {
            filteredUsers = _.filter(filteredUsers, u => _.inRange(u.age, 41, 51));
        } else if (ageVal === '51+') {
            filteredUsers = _.filter(filteredUsers, u => u.age >= 51);
        }

        if (regionFilter.value !== 'All') {
            const regionMap = {
                'Europe': ['Germany', 'Switzerland', 'Denmark', 'Spain', 'Finland', 'France', 'United Kingdom', 'Ireland', 'Norway', 'Netherlands', 'Turkey', 'Ukraine', 'Belgium'],
                'Asia': ['Iran', 'Turkey', 'India', 'China'],
                'North America': ['United States', 'Canada', 'USA']
            };
            const countries = regionMap[regionFilter.value] || [];
            filteredUsers = _.filter(filteredUsers, user => _.includes(countries, user.country));
        }

        visibleCount = 10;
        renderTeachers(filteredUsers);
        tableData = filteredUsers;
        displayTablePage(1);
        renderPieChart(filteredUsers);
        renderWebDataRocks(filteredUsers);
    });
}

// Render functions
function renderTeachers(usersArray) {
    currentFilteredUsers = usersArray;
    const teacherList = document.querySelector('.teacher-list');
    if (!teacherList) return;

    const visibleTeachers = _.take(usersArray, visibleCount);

    teacherList.innerHTML = _.map(visibleTeachers, (user) => {
        const fullName = user.full_name || 'Unknown Teacher';
        const course = user.course || 'Unknown course';
        const country = user.country || 'Unknown country';
        const initials = user.full_name
            ? user.full_name
                .split(' ')
                .map((namePart) => namePart[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
            : 'N/A';

        const imageMarkup = user.picture_large
            ? `<img src="${user.picture_large}" alt="${fullName}" class="teacher-photo">`
            : `<span class="initials">${initials}</span>`;

        const starMarkup = `<span class="star-icon ${user.favorite ? 'star-icon_active' : ''}" data-id="${user.id}">${user.favorite ? '★' : '☆'}</span>`;

        return `
            <div class="teacher-card" data-id="${user.id}">
                <div class="image-container">
                    ${imageMarkup}
                    ${starMarkup}
                </div>
                <h3 class="teacher-name">${fullName}</h3>
                <p class="teacher-specialty">${course}</p>
                <p class="teacher-location">${country}</p>
            </div>
        `;
    }).join('');

    if (showMoreBtn) {
        if (visibleCount >= usersArray.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
        }
    }
}

function renderStatistics(usersArray) {
    const statisticsBody = document.querySelector('.statistics-table tbody');

    if (!statisticsBody) return;

    statisticsBody.innerHTML = _.map(usersArray, (user) => `
        <tr>
            <td>${user.full_name || 'Unknown'}</td>
            <td>${user.course || 'Unknown course'}</td>
            <td>${user.age || 'N/A'}</td>
            <td>${user.gender || 'Unknown'}</td>
            <td>${user.country || 'Unknown country'}</td>
        </tr>
    `).join('');
}

function renderPieChart(usersArray) {
    const canvas = document.getElementById('statisticsChart');
    if (!canvas) return;
    const courseCounts = {};
    usersArray.forEach((user) => {
        let course = user.course ? user.course.trim() : 'Unknown';
        course = _.startCase(_.toLower(course));
        courseCounts[course] = (courseCounts[course] || 0) + 1;
    });

    const labels = Object.keys(courseCounts);
    const data = Object.values(courseCounts);

    const vibrantColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#2ECC71', '#E75480', '#34495E', '#1ABC9C',
        '#9B59B6', '#F1C40F', '#E67E22', '#3498DB'
    ];

    if (statisticsChartInstance) {
        statisticsChartInstance.destroy();
    }

    statisticsChartInstance = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: vibrantColors.slice(0, labels.length),
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding:20
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

function renderWebDataRocks(usersArray) {
    const pivotData = _.map(usersArray, (user) => {
        let course = user.course ? user.course.trim() : 'Unknown';
        course = _.startCase(_.toLower(course));

        return {
            "Name": user.full_name || 'Unknown',
            "Speciality": course,
            "Age": user.age ? String(user.age) : 'N/A',
            "Gender": user.gender || 'Unknown',
            "Country": user.country || 'Unknown country'
        };
    });

    if (webDataRocksInstance) {
        webDataRocksInstance.dispose();
    }

    webDataRocksInstance = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: pivotData
            },
            slice: {
                rows: [
                    { uniqueName: "Name", caption: "Name" },
                    { uniqueName: "Speciality", caption: "Speciality" },
                    { uniqueName: "Age", caption: "Age" },
                    { uniqueName: "Gender", caption: "Gender" },
                    { uniqueName: "Country", caption: "Country" }
                ]
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: false,
                    showTotals: "off",
                    showGrandTotals: "off"
                }
            },
            tableSizes: {
                columns: [
                    { idx: 0, width: 150 },
                    { idx: 1, width: 150 },
                    { idx: 2, width: 150 },
                    { idx: 3, width: 150 },
                    { idx: 4, width: 150 }
                ]
            }
        },
        customizeCell: function(cell, data) {
            if (data.rowIndex === 0) {
                cell.addClass("custom-header-style");
            } 
            else {
                cell.addClass("custom-cell-style");
            }

            if (data.type === "header") {
                if (data.hierarchy && data.hierarchy.uniqueName === "Measures") {
                    cell.style = { display: "none" };
                }
            }
        }
    });
}

function renderFavorites(usersArray) {
    const favoritesContainer = document.querySelector('.favorites-grid');

    if (!favoritesContainer) return;

    const favoriteTeachers = _.take(_.filter(usersArray, { favorite: true }), 5);
    const teachersToRender = _.isEmpty(favoriteTeachers) ? _.take(usersArray, 5) : favoriteTeachers;

    favoritesContainer.innerHTML = _.map(teachersToRender, (user) => {
        const fullName = user.full_name || 'Unknown Teacher';
        const country = user.country || 'Unknown country';
        const initials = user.full_name
            ? user.full_name
                .split(' ')
                .map((namePart) => namePart[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
            : 'N/A';

        const imageMarkup = user.picture_large
            ? `<img src="${user.picture_large}" alt="${fullName}" class="teacher-photo">`
            : `<span class="initials">${initials}</span>`;
        const starMarkup = `<span class="star-icon ${user.favorite ? 'star-icon_active' : ''}" data-id="${user.id}">${user.favorite ? '★' : '☆'}</span>`;

        return `
            <div class="teacher-card" data-id="${user.id}">
                <div class="image-container">
                    ${imageMarkup}
                    ${starMarkup}
                </div>
                <h3 class="teacher-name">${fullName}</h3>
                <p class="teacher-location">${country}</p>
            </div>
        `;
    }).join('');
}

// LAB 3
teacherList.addEventListener('click', (event) => {
    const starEl = event.target.closest('.star-icon');
    if (starEl) {
        const starId = starEl.getAttribute('data-id');
        const targetUser = _.find(finalUsers, { id: starId });

        if (targetUser) {
            targetUser.favorite = !targetUser.favorite;
            saveFavoritesToStorage();
            renderTeachers(currentFilteredUsers);
            renderFavorites(finalUsers);
        }
        return;
    }

    const cardEl = event.target.closest('.teacher-card');
    if (cardEl) {
        const cardId = cardEl.getAttribute('data-id');
        const clickedTeacher = _.find(finalUsers, { id: cardId });

        if (clickedTeacher) {
            openTeacherPopup(clickedTeacher);
        }
    }
});

addTeacherPopup.querySelector('.popup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const dobValue = form.querySelector('#dob').value;
    const birthYear = dobValue ? new Date(dobValue).getFullYear() : null;
    const calculatedAge = birthYear ? new Date().getFullYear() - birthYear : null;

    const newTeacher = {
        id: Date.now().toString(),
        full_name: form.querySelector('#name').value.trim(),
        course: form.querySelector('#specialty').value,
        country: form.querySelector('#country').value,
        city: form.querySelector('#city').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        b_date: dobValue,
        age: calculatedAge,
        gender: form.querySelector('input[name="sex"]:checked')?.value || '',
        bg_color: form.querySelector('#bgcolor').value,
        note: form.querySelector('#notes').value.trim() || 'Empty',
        favorite: false
    };

    const validationErrors = getUserValidationErrors(newTeacher); 
    if (validationErrors.length > 0) {
        alert("Validation errors:\n" + validationErrors.join("\n"));
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTeacher),
        });

        if (response.ok) {
            const savedTeacher = await response.json();
            
            finalUsers.unshift(savedTeacher);
            renderTeachers(finalUsers);
            renderFavorites(finalUsers);
            tableData = [...finalUsers];
            displayTablePage(1);
            
            addTeacherPopup.classList.remove('active');
            form.reset();
        }
    } catch (error) {
        console.error('Error saving teacher to json-server:', error);
    }
});

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=10&seed=teachers_app_more');
            const data = await response.json();
            const newUsers = _.map(data.results, formatUser);
            finalUsers = _.concat(finalUsers, newUsers);
            visibleCount += 10;
            tableData = [...finalUsers];
            renderTeachers(finalUsers);
            displayTablePage(currentPage);
        } catch (error) {
            console.error('Error fetching more teachers:', error);
        }
    });
}

// LAB 4
async function fetchTeachers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50&seed=teachers_app');
        const data = await response.json();
        const users = data.results;

        const mergedApiUsers = mergeTeachers(users, additionalUsers);
        let savedTeachers = [];
        try {
            const localResponse = await fetch('http://localhost:3000/teachers');
            savedTeachers = await localResponse.json();
        } catch (e) {
            console.warn('Could not fetch saved teachers from json-server. Proceeding without them.', e);
        }

        const uniqueSaved = _.filter(savedTeachers, st => !_.some(mergedApiUsers, { id: st.id }));

        finalUsers = _.concat(uniqueSaved, mergedApiUsers);

        const favoriteIds = loadFavoritesFromStorage();
        if (!_.isEmpty(favoriteIds)) {
            finalUsers.forEach(user => {
                user.favorite = _.includes(favoriteIds, user.id);
            });
        }

        tableData = [...finalUsers];
        renderTeachers(finalUsers);
        renderFavorites(finalUsers);
        renderPieChart(finalUsers);
        renderWebDataRocks(finalUsers);
        displayTablePage(1);

    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

function getDaysUntilBirthday(bDateStr) {
    if (!bDateStr) return null;

    const today = dayjs().startOf('day');
    const birthDate = dayjs(bDateStr);

    if (!birthDate.isValid()) return null;

    let nextBirthday = dayjs()
        .month(birthDate.month())
        .date(birthDate.date())
        .startOf('day');

    if (nextBirthday.isBefore(today)) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    return nextBirthday.diff(today, 'day');
}

function saveFavoritesToStorage() {
    const favoriteIds = _.map(_.filter(finalUsers, { favorite: true }), 'id');
    localStorage.setItem('favoriteTeachers', JSON.stringify(favoriteIds));
}

function loadFavoritesFromStorage() {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteTeachers')) || [];
    return favoriteIds;
}

fetchTeachers();