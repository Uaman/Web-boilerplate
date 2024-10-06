var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var courses = [
    "Mathematics", "Physics", "English", "Computer Science", "Dancing",
    "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"
];
var europeanCountries = [
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece',
    'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco',
    'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal',
    'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
    'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City',
    'Montenegro', 'Serbia', 'Kosovo', 'Bosnia and Herzegovina', 'Croatia', 'Slovenia',
    'Hungary', 'Slovakia', 'Czech Republic', 'Poland', 'Lithuania', 'Latvia', 'Estonia',
    'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland', 'Ireland', 'United Kingdom',
    'Netherlands', 'Belgium', 'Luxembourg', 'France', 'Spain', 'Portugal', 'Germany',
    'Switzerland', 'Austria', 'Italy', 'Slovenia', 'Croatia', 'Bosnia and Herzegovina',
    'Montenegro', 'Serbia', 'Albania', 'North Macedonia', 'Greece', 'Bulgaria', 'Romania',
    'Moldova', 'Ukraine', 'Belarus', 'Russia', 'Turkey', 'Cyprus', 'Malta'
];
function formatUser(users) {
    return users.map(function (user) { return ({
        id: generateUUID(),
        gender: user.gender,
        title: user.name.title,
        full_name: "".concat(user.name.first, " ").concat(user.name.last),
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
        /*
        large: "https://randomuser.me/api/portraits/men/73.jpg"
        
        medium: "https://randomuser.me/api/portraits/med/men/73.jpg"
        
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
        */
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        picture_medium: user.picture.medium,
        course: getRandomCourse(),
        favorite: Math.random() > 0.5,
        img: user.picture.large,
        bg_color: '#FFFFFF',
        region: setRegion(user),
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }); });
}
function setRegion(user) {
    var country = user.location.country;
    if (country === 'United States' || country === 'USA') {
        return 'USA';
    }
    else if (europeanCountries.includes(country)) {
        return 'Europe';
    }
    else {
        return 'Other';
    }
}
function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
}
function generateUUID() {
    return Math.floor(Math.random() * 1000000);
}
function mergeUsers(users, additionalUsers) {
    var combinedUsers = __spreadArray(__spreadArray([], users, true), additionalUsers, true);
    var seenNames = new Set();
    var uniqueUsers = combinedUsers.filter(function (user) {
        if (!seenNames.has(user.full_name)) {
            seenNames.add(user.full_name);
            return true;
        }
        return false;
    });
    return uniqueUsers.map(function (user) { return (__assign(__assign({}, user), { course: getRandomCourse(), note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })); });
}
function validateData(user) {
    console.log("Validating user ".concat(user.full_name, ", ID: ").concat(user.id));
    var startsWithUpperCase = function (str) { return /^[A-Z]/.test(str); };
    var validatePhoneNumber = function (phone) { return /^\d{10}$/.test(phone); }; // Adjust regex if needed
    // Check phone number
    if (!validatePhoneNumber(user.phone)) {
        console.log('Invalid phone number');
        return false;
    }
    var stringFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'];
    for (var _i = 0, stringFields_1 = stringFields; _i < stringFields_1.length; _i++) {
        var field = stringFields_1[_i];
        if (typeof user[field] !== 'string' || !startsWithUpperCase(user[field])) {
            console.log("Invalid ".concat(field));
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
function sortUsers(users, sortBy, direction) {
    if (direction === void 0) { direction = 'asc'; }
    if (sortBy === undefined)
        return users;
    var sortedUsers = _.orderBy(users, [sortBy], [direction]);
    return sortedUsers;
}
function filterUsers(users, filters) {
    return _.filter(users, function (user) {
        if (!_.isUndefined(filters.age)) {
            var ageString = _.toString(filters.age).trim();
            if (_.includes(ageString, '-')) {
                var _a = _.map(_.split(ageString, '-'), _.parseInt), min = _a[0], max = _a[1];
                if ((min && user.age < min) || (max && user.age > max)) {
                    return false;
                }
            }
            else {
                var age = _.parseInt(ageString);
                if (!_.isNaN(age) && user.age !== age) {
                    return false;
                }
            }
        }
        if (filters.gender && _.toLower(_.trim(filters.gender)) !== _.toLower(_.trim(user.gender))) {
            return false;
        }
        if (filters.region && _.toLower(_.trim(filters.region)) !== _.toLower(_.trim(user.region))) {
            return false;
        }
        if (!_.isUndefined(filters.favorite) && filters.favorite !== user.favorite) {
            return false;
        }
        if (!_.isUndefined(filters.hasPhoto)) {
            var userHasPhoto = !_.isEmpty(_.trim(user.picture_large));
            if (filters.hasPhoto !== userHasPhoto) {
                return false;
            }
        }
        return true;
    });
}
// Приклад використання:
var users = [
    { age: 25, gender: 'male', favorite: true, region: 'US', picture_large: 'photo.jpg' },
    { age: 30, gender: 'female', favorite: false, region: 'UK', picture_large: '' }
];
var filters = { age: '20-30', gender: 'male', hasPhoto: true };
console.log(filterUsers(users, filters));
function searchForUser(users, searchBy) {
    return users.filter(function (user) {
        var _a;
        var ageMatch = true;
        var ageString = (_a = searchBy.age) === null || _a === void 0 ? void 0 : _a.toString().trim();
        if (ageString !== undefined) {
            var userAge = user.age;
            if (ageString.startsWith(">=")) {
                var ageValue = parseInt(ageString.slice(2).trim());
                ageMatch = userAge >= ageValue;
            }
            else if (ageString.startsWith("<=")) {
                var ageValue = parseInt(ageString.slice(2).trim());
                ageMatch = userAge <= ageValue;
            }
            else {
                ageMatch = userAge === parseInt(ageString);
            }
        }
        var nameMatch = searchBy.name ? user.full_name.toLowerCase().trim().includes(searchBy.name.toLowerCase().trim()) : true;
        var noteMatch = searchBy.note ? user.note.toLowerCase().trim().includes(searchBy.note.toLowerCase().trim()) : true;
        return ageMatch && nameMatch && noteMatch;
    });
}
function calculataeMatchPercentage(users, matchedUsers) {
    return Math.round((matchedUsers.length / users.length) * 100);
}
var teachers = [];
var totalFetched = 0;
var maxUsers = 50;
function fetchUsers(count) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://randomuser.me/api/?results=".concat(count))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.results];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching users:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadLodash(callback) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lodash@latest/lodash.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    function loadInitialTeachers() {
        return __awaiter(this, void 0, void 0, function () {
            var formattedTeachers_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchUsers(50)];
                    case 1:
                        teachers = _a.sent();
                        totalFetched = teachers.length;
                        formattedTeachers_1 = formatUser(teachers);
                        loadLodash(function () {
                            var sortedUsers = sortUsers(formattedTeachers_1, 'full_name', 'asc');
                            setupFilterEventListeners(sortedUsers);
                            console.log(sortedUsers[0]);
                            dropdownOptions(sortedUsers);
                            createTeachersList(sortedUsers);
                            addFavouriteTeacher(sortedUsers);
                            filterTeachers(sortedUsers);
                            sortUsersByAttribute(sortedUsers);
                            addTeacherCartInfo(sortedUsers);
                            searchForTeacher(sortedUsers);
                            loadChartJS(function () { return createAllPieCharts(sortedUsers); });
                            addTeacherForm(sortedUsers);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching users:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function setupFilterEventListeners(sortedUsers) {
        document.querySelectorAll('.age-option').forEach(function (option) {
            option.addEventListener('click', function () {
                var _a;
                var ageButton = document.querySelector('#age-params-btn');
                ageButton.textContent = ((_a = this.textContent) === null || _a === void 0 ? void 0 : _a.trim()) + ' ▼';
                filterTeachers(sortedUsers);
            });
        });
        document.querySelectorAll('.age-option, .region-option, .gender-option').forEach(function (option) {
            option.addEventListener('click', function () {
                filterTeachers(sortedUsers);
            });
        });
        document.querySelectorAll('.input-checkbox').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                filterTeachers(sortedUsers);
            });
        });
    }
    function updateDisplayedUsers(users) {
        var teachersContainers = document.querySelectorAll(".teachers-list-container");
        teachersContainers.forEach(function (container) {
            var existingList = container.querySelector('.teachers-list');
            if (existingList) {
                existingList.remove();
            }
        });
        createTeachersList(users);
        addTeacherCartInfo(users);
        populateStatistics(users);
    }
    function filterTeachers(teachers) {
        var _a, _b, _c;
        var selectedAgeRange = _.trim((_a = document.querySelector('#age-params-btn')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var selectedCountry = _.trim((_b = document.querySelector('#region-params-btn')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        var selectedGender = (_.trim((_c = document.querySelector('#sex-params-btn')) === null || _c === void 0 ? void 0 : _c.textContent) || '').toLowerCase();
        var onlyWithPhoto = _.get(document.querySelector('#photoCheck'), 'checked', false);
        var onlyFavorites = _.get(document.querySelector('#favCheck'), 'checked', false);
        var filteredTeachers = _.filter(teachers, function (teacher) {
            var ageMatch = (function () {
                var age = teacher.age;
                switch (selectedAgeRange) {
                    case '18-25': return age >= 18 && age <= 25;
                    case '26-31': return age >= 26 && age <= 31;
                    case '32-40': return age >= 32 && age <= 40;
                    case '41 - 55': return age >= 41 && age <= 55;
                    case '56+': return age >= 56;
                    default: return true;
                }
            })();
            var countryMatch = (function () {
                switch (selectedCountry) {
                    case 'Europe': return _.includes(europeanCountries, teacher.country);
                    case 'USA': return teacher.country === 'United States';
                    case 'Other': return !_.includes(europeanCountries, teacher.country) && teacher.country !== 'United States';
                    default: return true;
                }
            })();
            var genderMatch = selectedGender ? _.toLower(teacher.gender) === selectedGender : true;
            var photoMatch = onlyWithPhoto ? !_.isUndefined(teacher.picture_large) : true;
            var favoritesMatch = onlyFavorites ? teacher.favorite : true;
            return ageMatch && countryMatch && genderMatch && photoMatch && favoritesMatch;
        });
        updateDisplayedUsers(filteredTeachers);
    }
    function createTeachersList(teachers) {
        var _this = this;
        var teachersContainers = document.querySelectorAll(".teachers-list-container");
        if (teachersContainers.length === 0)
            return;
        _.forEach(teachersContainers, function (container) {
            container.innerHTML = '';
        });
        var teachersWrapper = document.createElement("div");
        teachersWrapper.classList.add("teachers-wrapper");
        var teachersList = document.createElement("ul");
        teachersList.classList.add("teachers-list");
        var leftArrow = document.createElement("span");
        leftArrow.classList.add("material-icons");
        leftArrow.textContent = "arrow_back";
        var rightArrow = document.createElement("span");
        rightArrow.classList.add("material-icons");
        rightArrow.textContent = "arrow_forward";
        _.forEach(teachers, function (teacher, index) {
            var listItem = document.createElement("li");
            listItem.classList.add("teacher-item");
            listItem.dataset.index = index.toString();
            listItem.innerHTML = "\n          <div class=\"teacher-image-container\">\n              <img src=\"".concat(teacher.picture_large, "\" alt=\"").concat(teacher.full_name, "\" class=\"teacher-image\"/>\n              <span class=\"star-icon ").concat(teacher.favorite ? 'visible' : 'hidden', "\">\u2B50</span>\n          </div>\n          <div class=\"teacher-info-container\">\n              <h3 class=\"teacher-name\">").concat(teacher.full_name, "</h3>\n              <p class=\"teacher-subject\">").concat(teacher.course, "</p>\n              <p class=\"teacher-country\">").concat(teacher.country, "</p>\n          </div>\n      ");
            teachersList.appendChild(listItem);
        });
        teachersWrapper.appendChild(leftArrow);
        teachersWrapper.appendChild(teachersList);
        teachersWrapper.appendChild(rightArrow);
        _.forEach(teachersContainers, function (teachersContainer) {
            teachersContainer.appendChild(teachersWrapper);
        });
        var scrollAmount = 500;
        var totalFetched = 0;
        rightArrow.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var newTeachers, formattedTeachers, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchUsers(10)];
                    case 1:
                        newTeachers = _a.sent();
                        formattedTeachers = formatUser(newTeachers);
                        teachers.push.apply(teachers, formattedTeachers);
                        totalFetched += formattedTeachers.length;
                        createTeachersList(teachers);
                        addTeacherCartInfo(teachers);
                        populateStatistics(sortUsers(teachers, 'full_name', 'asc'));
                        createAllPieCharts(teachers);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error fetching more users:', error_3);
                        return [3 /*break*/, 3];
                    case 3:
                        teachersList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        return [2 /*return*/];
                }
            });
        }); });
        leftArrow.addEventListener('click', function () {
            teachersList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        teachersList.addEventListener('click', function (e) {
            if (e.target.classList.contains('star-icon')) {
                var listItem = e.target.closest('.teacher-item');
                var teacherIndex = parseInt(listItem.dataset.index, 10);
                teachers[teacherIndex].favorite = !teachers[teacherIndex].favorite;
                e.target.classList.toggle('visible', teachers[teacherIndex].favorite);
                e.target.classList.toggle('hidden', !teachers[teacherIndex].favorite);
            }
        });
    }
    function addTeacherCartInfo(teachers) {
        var teacherListContainers = document.querySelectorAll(".teachers-list");
        var teacherInfoCardContainer = document.querySelector(".teacher-info-card-container");
        var closeBtn = document.querySelector(".close-btn");
        var overlay = document.querySelector(".overlay");
        if (!teacherListContainers.length || !teacherInfoCardContainer || !overlay || !closeBtn)
            return;
        teacherListContainers.forEach(function (teacherListContainer) {
            teacherListContainer.addEventListener("click", function (event) {
                var mouseEvent = event;
                var clickedItem = mouseEvent.target.closest(".teacher-item");
                if (clickedItem) {
                    var teacherIndex = clickedItem.dataset.index;
                    console.log("Clicked index: ".concat(teacherIndex)); // Log the index to debug
                    var teacher_1 = teachers[parseInt(teacherIndex)];
                    console.log("Selected Teacher: ".concat(teacher_1.full_name)); // Debug output for selected teacher
                    teacherInfoCardContainer.classList.remove("hidden");
                    overlay.classList.remove("hidden");
                    overlay.style.display = "block";
                    addTeacherInfoToCard(teacher_1, teachers);
                    loadLeafletJS(function () { return initializeMap(teacher_1); });
                    // loadDayJS(() => daysUntilNextBirthday(teacher));
                }
            });
        });
        closeBtn.addEventListener("click", function () {
            teacherInfoCardContainer.classList.add("hidden");
            overlay.classList.add("hidden");
            overlay.style.display = "none";
        });
    }
    function addTeacherInfoToCard(teacher, teachers) {
        var teacherInfoCard = document.querySelector(".teacher-info-card-main-container");
        if (!teacherInfoCard)
            return;
        loadDayJS(function () {
            var daysLeft = daysUntilNextBirthday(teacher); // Отримуємо кількість днів до наступного дня народження
            teacherInfoCard.innerHTML = "\n          <div class=\"teacher-info-card-main\">\n\n            <div class=\"teacher-info-card-image-container\" data-id=\"".concat(teacher.id, "\">\n              <img src='").concat(teacher.picture_large, "' alt=\"").concat(teacher.full_name, "\" class=\"teacher-info-card-image\" />\n            </div>\n            <div class=\"teacher-info-card-details\">\n              <div class=\"with-star\">\n                <h2 class=\"teacher-name\">").concat(teacher.full_name, "</h2>\n                <div class=\"add-fav-button-container\">\n                  <p class=\"add-to-fav\">").concat(teacher.favorite ? '⭐️' : '⚝', "</p>\n                </div>\n              </div>\n              <h3 class=\"teacher-info-card-subject\">").concat(teacher.course, "</h3>\n              <p>").concat(teacher.city, ", ").concat(teacher.country, "</p>\n              <p>").concat(teacher.age, ", ").concat(teacher.gender, "</p>\n              <a href=\"mailto:").concat(teacher.email, "\" class=\"link-teacher-info\">").concat(teacher.email, "</a>\n              <a href=\"phoneto:").concat(teacher.phone, "\">").concat(teacher.phone, "</a>\n              <div>\n              <h3>Days left to next birthday:  </h3>\n              <p class=\"daysToNextBd\">").concat(daysLeft, "</p> \n            </div>\n            </div>\n         \n          </div>\n\n          <div class=\"teacher-info-card-footer-container\">\n            <div class=\"description-container\">\n              <p>").concat(teacher.note, "</p>\n            </div>\n\n            <div class=\"teacher-info-card-map\">\n              <a href=\"https://www.google.com/maps?q=").concat(teacher.city, "\" target=\"_blank\" class=\"map-link link-teacher-info\">toggle map</a>\n            </div>\n            <div id=\"map\"></div>   \n          </div>\n        ");
            var addToFavButton = document.querySelector(".add-to-fav");
            if (addToFavButton) {
                addToFavButton.addEventListener("click", function () {
                    teacher.favorite = !teacher.favorite;
                    addToFavButton.textContent = teacher.favorite ? '⭐️' : '⚝';
                    var teacherItem = document.querySelector(".teacher-item[data-index=\"".concat(teachers.indexOf(teacher), "\"]"));
                    var starIcon = teacherItem === null || teacherItem === void 0 ? void 0 : teacherItem.querySelector('.star-icon');
                    if (starIcon) {
                        starIcon.classList.toggle('visible', teacher.favorite);
                        starIcon.classList.toggle('hidden', !teacher.favorite);
                    }
                    addFavouriteTeacher(teachers);
                });
            }
        });
    }
    function addFavouriteTeacher(teachers) {
        var favTeachersContainer = document.querySelector('.fav-teachers-list-container');
        if (!favTeachersContainer)
            return;
        // Clear previous favorite teachers list
        favTeachersContainer.innerHTML = '';
        var teachersWrapper = document.createElement("div");
        teachersWrapper.classList.add("teachers-wrapper");
        var teachersList = document.createElement("ul");
        teachersList.classList.add("teachers-list");
        // Create the left arrow
        var leftArrow = document.createElement("span");
        leftArrow.classList.add("material-icons");
        leftArrow.textContent = "arrow_back";
        // Create the right arrow
        var rightArrow = document.createElement("span");
        rightArrow.classList.add("material-icons");
        rightArrow.textContent = "arrow_forward";
        // Create a list of favorite teachers
        var favTeachers = teachers
            .filter(function (teacher) { return teacher.favorite; })
            .map(function (teacher) {
            var listItem = document.createElement("li");
            listItem.classList.add("teacher-item");
            listItem.innerHTML = "\n                <div class=\"teacher-image-container\">\n                    <img src='".concat(teacher.picture_large, "' alt=\"").concat(teacher.full_name, "\" class=\"teacher-image\" />\n                </div>\n                <div class=\"teacher-info-container\">\n                    <h3 class=\"teacher-name\">").concat(teacher.full_name, "</h3>\n                    <p class=\"teacher-country\">").concat(teacher.country, "</p>\n                </div>\n            ");
            return listItem;
        });
        // Append favorite teachers to the list
        favTeachers.forEach(function (listItem) {
            teachersList.appendChild(listItem);
        });
        // Append the list and arrows to the wrapper
        teachersWrapper.appendChild(leftArrow);
        teachersWrapper.appendChild(teachersList);
        teachersWrapper.appendChild(rightArrow);
        // Append the wrapper to the favorites container
        favTeachersContainer.appendChild(teachersWrapper);
        // Add scrolling functionality
        var scrollAmount = 300; // Adjust the amount to scroll
        leftArrow.addEventListener('click', function () {
            teachersList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', function () {
            teachersList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        // Show star icons for favorites
        document.querySelectorAll('.star-icon').forEach(function (icon) {
            icon.classList.add('visible');
        });
    }
    function dropdownOptions(teachers) {
        populateDropDowns(teachers);
        var dropdownButtons = document.querySelectorAll('.dropbtn');
        dropdownButtons.forEach(function (button) {
            button.innerHTML = 'Select an option';
            button.addEventListener('click', function (event) {
                var dropdownContent = this.nextElementSibling;
                dropdownContent === null || dropdownContent === void 0 ? void 0 : dropdownContent.classList.toggle('show');
                dropdownButtons.forEach(function (btn) {
                    var otherDropdown = btn.nextElementSibling;
                    if (otherDropdown !== dropdownContent) {
                        otherDropdown === null || otherDropdown === void 0 ? void 0 : otherDropdown.classList.remove('show');
                    }
                });
                event.stopPropagation();
            });
        });
        var dropdownOptions = document.querySelectorAll('.dropdown-content li');
        dropdownOptions.forEach(function (option) {
            option.addEventListener('click', function () {
                var button = this.closest('.dropdown').querySelector('.dropbtn');
                var filterValue = this.textContent || '';
                button.innerHTML = filterValue;
                this.parentElement.parentElement.classList.remove('show');
                filterTeachers(teachers);
            });
        });
        document.addEventListener('click', function () {
            dropdownButtons.forEach(function (button) {
                var dropdownContent = button.nextElementSibling;
                dropdownContent === null || dropdownContent === void 0 ? void 0 : dropdownContent.classList.remove('show');
            });
        });
    }
    function populateDropDowns(teachers) {
        specialityToPopulate(teachers);
    }
    function specialityToPopulate(teachers) {
        var specialityDropdownULs = document.querySelectorAll('.speciality-dropdown-to-populate');
        var uniqueSpecialities = new Set();
        teachers.forEach(function (teacher) {
            if (teacher.course) {
                uniqueSpecialities.add(teacher.course);
            }
        });
        var sortedSpeciality = Array.from(uniqueSpecialities).sort();
        specialityDropdownULs.forEach(function (dropdown) {
            dropdown.innerHTML = '';
            sortedSpeciality.forEach(function (course) {
                var li = document.createElement('li');
                li.classList.add('region-option');
                li.textContent = course;
                dropdown.appendChild(li);
            });
        });
    }
    function sortUsersByAttribute(users) {
        var data_sort_elements = document.querySelectorAll('th[data-sort]');
        populateStatistics(sortUsers(users, 'full_name', 'asc'));
        var sortDirections = {};
        data_sort_elements.forEach(function (element) {
            element.addEventListener('click', function () {
                var data_sort_value = element.getAttribute('data-sort');
                var arrow = element.querySelector('.arrow');
                if (data_sort_value) {
                    var currentDirection = sortDirections[data_sort_value] || 'asc';
                    var newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
                    sortDirections[data_sort_value] = newDirection;
                    if (arrow) {
                        arrow.textContent = newDirection === 'asc' ? '↑' : '↓';
                    }
                    var sortedUsers = sortUsers(users, data_sort_value, newDirection);
                    populateStatistics(sortedUsers);
                }
            });
        });
    }
    function populateStatistics(teachers) {
        var table = document.querySelector('table');
        if (!table)
            return;
        var tbody = table.querySelector('tbody');
        var paginationContainer = document.querySelector('.pagination');
        var teachersPerPage = 10;
        var currentPage = 1;
        function getPaginatedTeachers(page) {
            var startIndex = (page - 1) * teachersPerPage;
            return teachers.slice(startIndex, startIndex + teachersPerPage);
        }
        function renderTable(page) {
            if (tbody) {
                tbody.innerHTML = '';
            }
            var paginatedTeachers = getPaginatedTeachers(page);
            paginatedTeachers.forEach(function (teacher) {
                var tr = document.createElement('tr');
                tr.innerHTML = "\n          <td>".concat(teacher.full_name, "</td>\n          <td>").concat(teacher.course, "</td>\n          <td>").concat(teacher.age, "</td>\n          <td>").concat(teacher.gender, "</td>\n          <td>").concat(teacher.country, "</td>\n          <td>").concat(teacher.b_date, "</td>\n        ");
                tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
            });
        }
        function createPagination() {
            if (paginationContainer) {
                paginationContainer.innerHTML = '';
                var totalPages_1 = Math.ceil(teachers.length / teachersPerPage);
                var leftArrowButton = document.createElement('button');
                leftArrowButton.textContent = '←';
                leftArrowButton.disabled = currentPage === 1; // Вимкнення кнопки, якщо currentPage === 1
                leftArrowButton.addEventListener('click', function () {
                    if (currentPage > 1) {
                        currentPage--;
                        renderTable(currentPage);
                        updatePagination();
                    }
                });
                paginationContainer.appendChild(leftArrowButton);
                var _loop_1 = function (i) {
                    var pageButton = document.createElement('button');
                    pageButton.textContent = i.toString();
                    pageButton.classList.add('page-button');
                    if (i === currentPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', function () {
                        currentPage = i;
                        renderTable(currentPage);
                        updatePagination();
                    });
                    paginationContainer.appendChild(pageButton);
                };
                for (var i = 1; i <= totalPages_1; i++) {
                    _loop_1(i);
                }
                var rightArrow = document.createElement('button');
                rightArrow.textContent = '→';
                rightArrow.disabled = currentPage === totalPages_1; // Вимкнення кнопки, якщо currentPage === totalPages
                rightArrow.addEventListener('click', function () {
                    if (currentPage < totalPages_1) {
                        currentPage++;
                        renderTable(currentPage);
                        updatePagination();
                    }
                });
                paginationContainer.appendChild(rightArrow);
                // Оновлюємо пагінацію після створення
                updatePagination();
            }
        }
        function updatePagination() {
            var buttons = document.querySelectorAll('.page-button');
            buttons.forEach(function (button, index) {
                button.classList.toggle('active', index + 1 === currentPage);
            });
            var leftArrowButton = paginationContainer.querySelector('button:nth-child(1)'); // Або за класом
            leftArrowButton.disabled = currentPage === 1; // Деактивуємо кнопку при поточній сторінці 1
        }
        // Виклик функцій для початкового рендерингу
        renderTable(currentPage);
        createPagination();
    }
    function addTeacherForm(teachers) {
        var addTeacherButton = document.querySelector('#add-teacher-btn');
        var teacherForm = document.querySelector('.add-teacher-form-container');
        var overlay = document.querySelector('.overlay');
        var closeBtn = document.querySelector('.close-form-btn');
        var addBtn = document.querySelector('.add-teacher-form-button');
        var notification = document.querySelector('#notification');
        var counryButton = document.querySelector('#country');
        var specialityButton = document.querySelector('#speciality');
        var dateInput = document.querySelector('#date');
        var color = document.querySelector('#favcolor');
        if (!addTeacherButton || !teacherForm || !overlay || !closeBtn || !notification)
            return;
        addTeacherButton.addEventListener('click', function () {
            teacherForm.classList.remove('hidden');
            overlay.classList.remove('hidden');
            overlay.style.display = "block";
        });
        overlay.addEventListener("click", function () {
            teacherForm.classList.add('hidden');
            overlay.classList.add('hidden');
            overlay.style.display = "none";
        });
        closeBtn.addEventListener("click", function () {
            teacherForm.classList.add('hidden');
            overlay.classList.add('hidden');
            overlay.style.display = "none";
        });
        addBtn.addEventListener('click', function () {
            var form = teacherForm.querySelector('form');
            if (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault(); // Prevent the default form submission
                    // Collecting data from the form fields
                    var formData = new FormData(form);
                    var newTeacher = {
                        full_name: formData.get('full_name'),
                        course: specialityButton.textContent,
                        age: parseInt(dateInput.value),
                        gender: formData.get('gender'),
                        country: counryButton.textContent,
                        city: formData.get('city'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        note: formData.get('#note') || ' Hi, I am using this platform!',
                        favorite: false,
                        b_date: dateInput.textContent,
                        id: 0,
                        title: "",
                        state: "",
                        postcode: 0,
                        coordinates: {
                            latitude: "",
                            longitude: ""
                        },
                        timezone: {
                            offset: "",
                            description: ""
                        },
                        picture_large: null,
                        picture_thumbnail: null,
                        picture_medium: null,
                        region: "",
                        bg_color: color.value,
                    };
                    teachers.unshift(newTeacher);
                    createTeachersList(teachers);
                    addTeacherCartInfo(teachers);
                    // Show notification
                    showNotification('Викладача додано!');
                    form.reset();
                    teacherForm.classList.add('hidden');
                    overlay.classList.add('hidden');
                    overlay.style.display = "none";
                    console.log(newTeacher);
                    //POST request
                    fetch('http://localhost:3000/teachers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newTeacher)
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        console.log('Success:', data);
                    });
                });
            }
        });
    }
    function showNotification(message) {
        var notification = document.querySelector('#notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.remove('hidden');
            notification.style.display = 'block';
            // Hide the notification after 3 seconds
            setTimeout(function () {
                notification.classList.add('hidden');
                notification.style.display = 'none';
            }, 3000);
        }
    }
    function toggleMenu() {
        var menu = document.querySelector(".menu-links");
        var icon = document.querySelector(".hamburger-icon");
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle("open");
        icon === null || icon === void 0 ? void 0 : icon.classList.toggle("open");
    }
    function searchForTeacher(teachers) {
        var searchButton = document.querySelector('.search-btn');
        var searchInput = document.querySelector('.input-look-for-teacher');
        if (!searchButton || !searchInput)
            return;
        var handleSearch = function () {
            var searchQuery = searchInput.value.trim();
            var searchRegex = new RegExp("^".concat(searchQuery), 'i');
            var searchResults = _.isEmpty(searchQuery) || searchQuery === '*'
                ? teachers
                : _.filter(teachers, function (teacher) { return searchRegex.test(teacher.full_name); });
            var teachersContainers = document.querySelectorAll(".teachers-list-container");
            teachersContainers.forEach(function (container) {
                var existingList = container.querySelector('.teachers-list');
                if (existingList) {
                    existingList.remove();
                }
            });
            createTeachersList(searchResults);
            addTeacherCartInfo(teachers);
            var arrows = document.querySelectorAll('.material-icons');
            if (searchResults.length < 10) {
                _.forEach(arrows, function (arrow) {
                    arrow.classList.add('hidden');
                });
            }
            else {
                _.forEach(arrows, function (arrow) {
                    arrow.classList.remove('hidden');
                });
            }
            console.log(searchResults);
        };
        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
        searchButton.addEventListener('click', handleSearch);
    }
    function loadChartJS(callback) {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = callback;
        document.head.appendChild(script);
    }
    function loadLeafletJS(callback) {
        if (window.L) {
            callback();
        }
        else {
            var script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
            script.onload = function () {
                callback();
            };
            document.head.appendChild(script);
        }
    }
    function loadDayJS(callback) {
        if (window.dayjs) {
            callback();
        }
        else {
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/dayjs@latest/dayjs.min.js';
            script.onload = function () {
                callback();
            };
            document.head.appendChild(script);
        }
    }
    function daysUntilNextBirthday(teacher) {
        var today = window.dayjs(); // Отримуємо dayjs з глобального об'єкта window
        var birthdayThisYear = window.dayjs(teacher.b_date).year(today.year());
        var nextBirthday = birthdayThisYear.isBefore(today) ? birthdayThisYear.add(1, 'year') : birthdayThisYear;
        return nextBirthday.diff(today, 'day');
    }
    function initializeMap(teacher) {
        if (window.L) {
            var L = window.L;
            var latitude = parseFloat(teacher.coordinates.latitude);
            var longitude = parseFloat(teacher.coordinates.longitude);
            console.log("Latitude: ".concat(latitude, ", Longitude: ").concat(longitude));
            var map = L.map('map').setView([latitude, longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup("".concat(teacher.state, ", ").concat(teacher.country))
                .openPopup();
        }
        else {
            console.error('Leaflet library is not loaded.');
        }
    }
    function createPieChart(teachers, parameter, chartId, label) {
        var parameterCount = {};
        teachers.forEach(function (teacher) {
            var value;
            if (parameter === "age") {
                var age = teacher[parameter];
                if (age >= 18 && age <= 25) {
                    value = "18-25";
                }
                else if (age >= 26 && age <= 31) {
                    value = "26-31";
                }
                else if (age >= 32 && age <= 40) {
                    value = "32-40";
                }
                else if (age >= 41 && age <= 55) {
                    value = "41-55";
                }
                else {
                    value = "56+";
                }
            }
            else {
                value = teacher[parameter];
            }
            if (parameterCount[value]) {
                parameterCount[value]++;
            }
            else {
                parameterCount[value] = 1;
            }
        });
        var labels = Object.keys(parameterCount);
        var dataValues = Object.values(parameterCount);
        var data = {
            labels: labels,
            datasets: [{
                    label: label,
                    data: dataValues,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                    ],
                    hoverOffset: 0 // Прибирає зменшення при наведенні
                }]
        };
        var config = {
            type: 'pie',
            data: data,
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 18 // Збільшує шрифт підписів легенди
                            }
                        }
                    },
                    tooltip: {
                        bodyFont: {
                            size: 16 // Збільшує шрифт тексту підказок
                        }
                    }
                }
            },
        };
        var ctx = document.getElementById(chartId).getContext('2d');
        if (ctx) {
            new Chart(ctx, config);
        }
    }
    function createAllPieCharts(teachers) {
        createPieChart(teachers, 'age', 'agePieChart', 'Teachers in Such Age Groups:');
        createPieChart(teachers, 'gender', 'genderPieChart', 'Teachers: ');
        createPieChart(teachers, 'region', 'countryPieChart', 'Teachers from These Countries:');
        createPieChart(teachers, 'course', 'coursePieChart', 'Available Courses');
    }
    var teachers;
    return __generator(this, function (_a) {
        teachers = [];
        loadInitialTeachers();
        window.addEventListener('click', function () {
            var dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove('show');
            });
            var hamburgerIcon = document.querySelector('.hamburger-icon');
            hamburgerIcon === null || hamburgerIcon === void 0 ? void 0 : hamburgerIcon.addEventListener('click', toggleMenu);
        });
        return [2 /*return*/];
    });
}); });
