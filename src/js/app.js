const testModules = require('./test-module');
require('../css/app.css');

const userFile = require('./random-user-mock.js');
//formattedUserFile = require('./formatted-user-mock.js');


user_array = [];
processed_user_array = [];

//TASK1: Reformat data from random-user-mock.js into needed format
function format_data(random, additional) {
//console.log(rawData.name);

//random formatting
random.forEach(user => {
 formattedUser = {};

formattedUser.gender = user.gender;
formattedUser.title = user.name.title;
formattedUser.full_name = user.name.first + ' ' + user.name.last;

formattedUser.city = user.location.city;
formattedUser.state = user.location.state;
formattedUser.country = user.location.country;
formattedUser.postcode = user.location.postcode;
formattedUser.coordinates = user.location.coordinates;
formattedUser.timezone = user.location.timezone;

formattedUser.email = user.email;

formattedUser.b_date = user.dob.date;
formattedUser.age = user.dob.age;

formattedUser.phone = user.phone;

formattedUser.picture_large = user.picture.large;
formattedUser.picture_thumbnail = user.picture.thumbnail;

//additional fields
formattedUser.id = create_id(user.id.name, user.id.value);
formattedUser.favorite = create_favorite(user.favorite);
formattedUser.course = create_course(user.course);
formattedUser.bg_color = create_bg_color(user.bg_color);
formattedUser.note = create_note(user.note);

user_array.push(formattedUser);
});

//additinal formatting
additional.forEach(user => {
 formattedUser = {};

formattedUser.gender = define(user.gender);
formattedUser.title = define(user.title);
formattedUser.full_name = define(user.full_name);

formattedUser.city = define(user.city);
formattedUser.state = define(user.state);
formattedUser.country = define(user.country);
formattedUser.postcode = define(user.postcode);
formattedUser.coordinates = define(user.coordinates);
formattedUser.timezone = define(user.timezone);

formattedUser.email = define(user.email);

formattedUser.b_date = define(user.b_day);
formattedUser.age = define(user.age);

formattedUser.phone = define(user.phone);

formattedUser.picture_large = define(user.picture_large);
formattedUser.picture_thumbnail = define(user.picture_thumbnail);

//additional fields
formattedUser.id = user.id;
formattedUser.favorite = create_favorite(user.favorite);
formattedUser.course = create_course(user.course);
formattedUser.bg_color = create_bg_color(user.bg_color);
formattedUser.note = create_note(user.note);

 user_array.push(formattedUser);
});

//process users so no duplicates are kept
processed_user_array = check_for_duplicates(user_array);

//return the final array
return processed_user_array;
}

function define(data) {
return typeof data === "undefined" ? null : data;
}

function create_id(name, value) {

if(value === null) {//generate id value
name = 'TFN';
value = generate_tfn();
}
return name + '' + value;
}

function generate_tfn() {
  //create vars
  var tfn = Math.floor(100000000 + Math.random() * 900000000);
  var sum;
  var zero = 13;
  var weights = [10, 7, 8, 4, 6, 3, 5, 2, 1];

  //loop through each
  while (zero != 0) {
    //reset vars
    sum = 0;
    tfn = parseInt(tfn) + 1;
    product = 0;

    //Loop through each number
    for (var i = 0; i < String(tfn).length; i++) {
      //Check digit
      sum = sum + (String(tfn).substr(i, 1) * weights[i]);
    }

    //check if valid
    zero = sum % 11;
  }

 return tfn;
}

function create_favorite(data){
favorite = define(data);//check if field exists
if(favorite === null) {
favorite = Math.random()>=0.5;
}

return favorite;
}

let courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
               "Law", "Art", "Medicine", "Statistics"];
function create_course(data){
course = define(data);//check if field exists
if(course === null) {
course = courses[(Math.floor(Math.random() * courses.length))];
}

return course;
}

function create_bg_color(data) {
bg_color = define(data);//check if field exists
if(bg_color === null) {
bg_color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

return bg_color;
}

function create_note(data) {
default_note = define(data);
if(default_note === null) {
default_note = 'User is shy~';
}

return default_note;
}

function check_for_duplicates(array) {

filtered_array = array.reduce((temp_list, this_user) => {
if(!temp_list.find((user) => user.full_name === this_user.full_name)) {
    temp_list.push(this_user);
}
return temp_list;
}, []);

return filtered_array;
}


//validation check
//processed_user_array.forEach((user => {console.log('All users are valid: ' + validate_user(processed_user_array))});


//TASK2: Validate object
function validate_users(user_array) {

for (i = 0; i < user_array.length; i++) {
user = user_array[i];
//string fields
console.log('User ' + i + ' name is valid: ' + validate_string_field(user.full_name, i) +
';\nGender is valid: ' + validate_string_field(user.gender, i) +
';\nNote is valid: ' + validate_string_field(user.note, i) +
';\nState is valid: ' + validate_string_field(user.state, i) +
';\nCity is valid: ' + validate_string_field(user.city, i) +
';\nCountry is valid: ' + validate_string_field(user.country, i) +
';\nAge is valid: ' + isNumber(user.age) +
';\nPhone is valid: ' + isValidPhoneNumber(user.phone) + //phone number WHAT DO YOU MEAN BY COUNTRY. AM I SUPPOSED TO WRITE A MAP???
';\nEmail is valid: ' + isValidEmail(user.email));
}
}

function validate_string_field(data, index) {
field_is_valid = (isString(data) && firstLetterUppercase(data));

if (!isString(data) && !firstLetterUppercase(data)) {//case if totally invalid
console.log('User ' + index + ' field DOES NOT FIT CRITERIA;');
} else if (!isString(data)) {//not string
console.log('User ' + index + ' field IS NOT STRING');
} else if (!firstLetterUppercase(data)) {//1st letter not capitalized
console.log('User ' + index + ' field FIRST LETTER NOT CAPITALIZED');
} else {
return field_is_valid;
}
return field_is_valid;
}


function isString(value) {
return typeof value === 'string';
}

function firstLetterUppercase(value) {
return /^[A-Z]/.test(value);
}

function isNumber(age){
if (age === null) {
console.log('Age is null');
return false;
}
return  Number.isInteger(age);
}

function isValidPhoneNumber(phone) {

   //regex to check valid phone number.
    const pattern = /^(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

    if (phone === null) {
    console.log('Phone is null');
    return false;
    }
    //return true if the phone number matched the regex
    return pattern.test(phone)
}


function isValidEmail(email) {
    if (email === null) {
        console.log('Email is null');
        return false;
    }
  return email.includes('@');
}

//TASK 3: Filter objects by 4 parameters (&&)
function parameter_filter(user_array, country, age, gender, favorite) {

const filtered_users = user_array.filter(user => user.country === country
&& user.age === age
&& user.gender === gender
&& user.favorite === favorite);

console.log(filtered_users);

return filtered_users;
}

//TASK 4: Sort objects by 4 parameters (||)
function parameter_sort(user_array, sort_by_full_name, sort_by_age, sort_by_b_date, sort_by_country, ascending) {
user_array.sort((a, b) => {

if (sort_by_full_name) {
if (a.full_name < b.full_name) return ascending ? -1 : 1;
if (a.full_name > b.full_name) return ascending ? 1 : -1;
}

if (sort_by_age) {
if (a.age < b.age) return ascending ? -1 : 1;
if (a.age > b.age) return ascending ? 1 : -1;
}

if(sort_by_b_date) {
if (new Date(a.b_date) < new Date(b.b_date)) return ascending ? -1 : 1;
if (new Date(a.b_date) > new Date(b.b_date)) return ascending ? 1 : -1;
}

if(sort_by_country) {
if (a.country < b.country) return ascending ? -1 : 1;
if (a.country > b.country) return ascending ? 1 : -1;
}

//IF both identical return 0
return 0;
});

return user_array;
}


//TASK 5: find object by parameter
function find_user(user_array, field){

const filtered_users = user_array.filter(user => user.name === field
|| user.note === field
|| user.age === field);
if(filtered_users.length == 0) {
console.log('No users found');
return null;
}
return filtered_users;
}


//TASK 6: statistics
function calculate_statistics(user_array, field){

let temp = find_user(user_array, field);
let percentage = Math.round(((temp.length / user_array.length) * 100) * 100) / 100;

return percentage;
}


//call functions
console.log(/*JSON.stringify(*/format_data(userFile.randomUserMock, userFile.additionalUsers)/*)*/);
validate_users(processed_user_array);
parameter_filter(processed_user_array, 'Switzerland', 39, 'female', false);//since favorite is randomly generated it can appear or not appear
console.log(/*JSON.stringify(*/parameter_sort(processed_user_array, false, true, false, true, true)/*)*/);//name age b_date country ascending(t/f)
console.log(/*JSON.stringify*/(find_user(processed_user_array, 'User is shy~')/*)*/);//name note age
console.log(calculate_statistics(processed_user_array, 'old lady with a cats'));//get percentage from total

console.log(testModules.hello);
