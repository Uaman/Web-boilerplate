"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUsersResult = void 0;
var data_1 = require("./data");
var Courses_1 = require("./types/Courses");
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
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        course: getRandomCourse(),
        favorite: Math.random() < 0.5,
        bg_color: '#FFFFFF',
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }); });
}
function getRandomCourse() {
    return Courses_1.courses[Math.floor(Math.random() * Courses_1.courses.length)];
}
function generateUUID() {
    return Math.floor(Math.random() * 1000000);
}
function mergeUsers(users, additionalUsers) {
    var combinedUsers = __spreadArray(__spreadArray([], users, true), additionalUsers, true);
    var uniqueUsers = combinedUsers.filter(function (user, index) {
        var firstIndex = combinedUsers.findIndex(function (u) { return u.id === user.id; });
        return firstIndex === index;
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
    // Check string fields
    var stringFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'];
    for (var _i = 0, stringFields_1 = stringFields; _i < stringFields_1.length; _i++) {
        var field = stringFields_1[_i];
        if (typeof user[field] !== 'string' || !startsWithUpperCase(user[field])) {
            console.log("Invalid ".concat(field));
            return false;
        }
    }
    // Check age
    if (typeof user.age !== 'number' || user.age < 0) {
        console.log('Invalid age');
        return false;
    }
    // Check email
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
    return users.sort(function (a, b) {
        var comparison = 0;
        // Ensure properties exist before comparing
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
    return users.filter(function (user) {
        var _a;
        var ageString = (_a = filters.age) === null || _a === void 0 ? void 0 : _a.toString();
        var _b = ageString && ageString.includes("-") ? ageString.split("-") : [ageString, ageString], ageStart = _b[0], ageEnd = _b[1];
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
            else if (ageString.startsWith(">")) {
                var ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge > ageValue;
            }
            else if (ageString.startsWith("<")) {
                var ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge < ageValue;
            }
            else if (ageString.startsWith("=")) {
                var ageValue = parseInt(ageString.slice(1).trim());
                ageMatch = userAge === ageValue;
            }
            else {
                var ageValue = parseInt(ageString);
                ageMatch = userAge === ageValue;
            }
        }
        var nameMatch = searchBy.name !== undefined
            ? user.full_name.toLowerCase() === searchBy.name.toLowerCase()
            : true;
        var noteMatch = searchBy.note !== undefined
            ? user.note.toLowerCase().includes(searchBy.note.toLowerCase())
            : true;
        return ageMatch && nameMatch && noteMatch;
    });
}
function calculataeMatchPercentage(users, matchedUsers) {
    return Math.round((matchedUsers.length / users.length) * 100);
}
var formattedUsers = formatUser(__spreadArray([], data_1.randomUserMock, true));
var mergeUsersResult = mergeUsers(formattedUsers, data_1.additionalUsers);
exports.mergeUsersResult = mergeUsersResult;
console.log('Formatted and merged users:', mergeUsersResult);
console.log('Validation Results:');
formattedUsers.forEach(function (user) { return console.log(validateData(user)); });
var filteredUsers = filterUsers(mergeUsersResult, {
    course: 'Computer Science',
    favorite: true,
    age: 62 - 49,
});
console.log('Filtered users:', filteredUsers);
var sortedUsers = sortUsers(mergeUsersResult, 'full_name', 'asc');
console.log('Sorted users:', sortedUsers);
var searchResults = searchForUser(mergeUsersResult, { age: ">30" });
var matchPercentage = calculataeMatchPercentage(mergeUsersResult, searchResults);
console.log('Search Results:', searchResults);
console.log('Match percentage:', matchPercentage);
