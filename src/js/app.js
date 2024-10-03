const testModules = require('./test-module.js');
require('../css/app.css');
//const sass = require('sass');

const userFile = require('./random-user-mock.js');
//formattedUserFile = require('./formatted-user-mock.js');


//user_array = [];
processed_user_array = [];

top_teachers_array = [];
statistics_array = [];
favorites_array = [];

result_arr = [];


//TASK1: Reformat data from random-user-mock.js into needed format
function format_data(random, additional) {
//console.log(rawData.name);
user_array = [];
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
processed_user_array.push(...check_for_duplicates(user_array));
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


function create_course(data){
let courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
                                            "Law", "Art", "Medicine", "Statistics"];
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



//TASK2: Validate object
function validate_users(us_array) {
//console.log(us_array.length);
for (i = 0; i < us_array.length; i++) {
user = us_array[i];
//string fields
//console.log("HI!");
validation = 'User ' + i + ' name is valid: ' + validate_string_field(user.full_name, i) +
';\nGender is valid: ' + validate_string_field(user.gender, i) +
';\nNote is valid: ' + validate_string_field(user.note, i) +
';\nState is valid: ' + validate_string_field(user.state, i) +
';\nCity is valid: ' + validate_string_field(user.city, i) +
';\nCountry is valid: ' + validate_string_field(user.country, i) +
';\nAge is valid: ' + isNumber(user.age) +
';\nPhone is valid: ' + isValidPhoneNumber(user.phone) + //phone number WHAT DO YOU MEAN BY COUNTRY. AM I SUPPOSED TO WRITE A MAP???
';\nEmail is valid: ' + isValidEmail(user.email);
//console.log("HI!");
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
function parameter_filter(user_array, country, min_age, max_age, gender, favorite) {
filtered_users = [];
if(favorite) {
filtered_users = user_array.filter(user => user.country === country
&& (user.age >= min_age && user.age <= max_age)
&& user.gender === gender
&& user.favorite);
} else {
filtered_users = user_array.filter(user => user.country === country
&& (user.age >= min_age && user.age <= max_age)
&& user.gender === gender);
}

console.log(filtered_users);

return filtered_users;
}



//TASK 4: Sort objects by 4 parameters (||)
function parameter_sort(user_array, sort_by_full_name, sort_by_age, sort_by_b_date, sort_by_country, sort_by_spec, ascending) {
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

if(sort_by_spec) {
if (a.course < b.course) return ascending ? -1 : 1;
if (a.course > b.course) return ascending ? 1 : -1;
}

//IF both identical return 0
return 0;
});

return user_array;
}


//TASK 5: find object by parameter
function find_user(user_array, field){
if(field === "") {
return user_array;
}

//console.log("Inside find_user field = " + field);
//console.log(user_array);
const filtered_users = user_array.filter(user =>
user.full_name === field
|| user.note === field
|| user.age == field
|| user.id === field);

//console.log("filtered_users");
//console.log(filtered_users);

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


//call functions LAB 2
//console.log(format_data(userFile.randomUserMock, userFile.additionalUsers)); //userFile.additionalUsers,
//validate_users(processed_user_array);
//parameter_filter(processed_user_array, 'Switzerland', 39, 'female', false);//since favorite is randomly generated it can appear or not appear
//console.log(parameter_sort(processed_user_array, false, true, false, true, true));//name age b_date country ascending(t/f)
//console.log(find_user(processed_user_array, 'old lady with a cats'));//name note age
//console.log(calculate_statistics(processed_user_array,  55) + "%");//get percentage from total

console.log(testModules.hello);



//LAB3

//const result = sass.compile("style.scss");
//console.log(result.css);

//transfer data to html TOP TEACHERS

//console.log("hELLO");
//const dataElement = document.querySelector('.searched-teacher-list');
//processed_user_array.map(user => {
//dataElement.insertAdjacentHTML('afterbegin', `
//
//        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
//            <div class="image-box">
//                <img class="teacher-image" src=${user.picture_thumbnail}>
//                <span class="teacher-initials">I.T</span>
//            </div>
//            <div class="teacher-item-info">
//                <p class="teacher-name">${user.full_name}</p>
//                <p class="teacher-spec">${user.course}</p>
//                <p class="teacher-region">${user.country}</p>
//            </div>
//        </div>
//`)
//})

//top_teachers_array
function cleanUpTeachers(){
 //("in cleanUpTeachers()");
    document.getElementById("top_teachers_list").innerHTML = "";
}

//clean stats table
function clearTable(){
    document.getElementById("table_body_id").innerHTML = "";
}

//used in searchForTeacher()
function loadUpTeachers(arr) {
if(arr === null) {
return;
}
 //console.log("in loadUpTeachers()");
const dataElement = document.querySelector('.searched-teacher-list');
arr.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})

}

//this function should also write info into info popup (by id)
function openTeacherInfo(teacher_id) {
    //open the popup
    let popup = document.getElementById("popup_id");
    popup.style.visibility = "visible";
//    let pop_img = document.getElementById("teacher_image_full");
//    pop_img.style.visibility = "visible";
    //call to fill with proper content
    fillPopupContent(teacher_id);
    }
function openAddTeacherPopup(){
let popup = document.getElementById("add_teacher_popup");
    popup.style.visibility = "visible";
}

function fillPopupContent(teacher_id){
//put data that's actually supposed to be there
const popupInnards = processed_user_array.filter(user => user.id === teacher_id)[0];

    const teacherInfoContainer = document.getElementById("teacher_info");
    teacherInfoContainer.innerHTML = "";

    let teacherInfoName = document.createElement("h1");
    teacherInfoName.id = "teacher_name";
     teacherInfoName.innerText = popupInnards.full_name;
    teacherInfoContainer.appendChild(teacherInfoName);

     let teacherInfoCourse = document.createElement("h3");
        teacherInfoCourse.id = "teacher_speciality_full";
         teacherInfoCourse.innerText = popupInnards.course;
        teacherInfoContainer.appendChild(teacherInfoCourse);

     let teacherInfoCountry = document.createElement("h4");
             teacherInfoCountry.id = "teacher_region_full";
              teacherInfoCountry.innerText = popupInnards.country;
             teacherInfoContainer.appendChild(teacherInfoCountry);

     let teacherInfoGender = document.createElement("h4");
                  teacherInfoGender.id = "teacher_age_gender_full";
                   teacherInfoGender.innerText = popupInnards.age + ", " + popupInnards.gender;
                  teacherInfoContainer.appendChild(teacherInfoGender);

    let teacherInfoEmail = document.createElement("address");
                      teacherInfoEmail.id = "email_address";
                       teacherInfoEmail.innerText = popupInnards.email;
                      teacherInfoContainer.appendChild(teacherInfoEmail);

    let teacherInfoPhone = document.createElement("h4");
                      teacherInfoPhone.id = " teacher_phone_full";
                       teacherInfoPhone.innerText = "+" + popupInnards.phone;
                      teacherInfoContainer.appendChild(teacherInfoPhone);


    const teacherInfoAbout = document.getElementById("teacher_desc_box");
    teacherInfoAbout.innerHTML = "";
        let teacherInfoDesc = document.createElement("p");
            teacherInfoDesc.id = "teacher_description_full";
             teacherInfoDesc.innerText = popupInnards.note;
            teacherInfoAbout.appendChild(teacherInfoDesc);

  const teacherInfoImageBox = document.getElementById("teacher_image");
    teacherInfoImageBox.innerHTML = "";
     let teacherInfoImg = document.createElement("img");
                teacherInfoImg.id = "teacher_image_full"
              // teacherInfoImg.class = "teacher-image-full";
               console.log(popupInnards.picture_large);
                 teacherInfoImg.src = popupInnards.picture_large;
                // document.getElementById('teacher_image_full').src = popupInnards.picture_large;
                 console.log(teacherInfoImg.src);
                teacherInfoImageBox.appendChild(teacherInfoImg);

//    alert(teacher_id);
//    console.log(teacherInfoName);
//   console.log(popupInnards);
}

function closeTeacherInfo() {
            let popup = document.getElementById("popup_id");
            popup.style.visibility = "hidden";
        }

function closeAddTeacherPopup() {
let popup = document.getElementById("add_teacher_popup");
            popup.style.visibility = "hidden";
}

is_fav = false;
function toggleFavorite() {
let favImg = document.getElementById("teacher_favorite_star");

if(!is_fav) {
     favImg.src =
     "./images/star_filled.png"
     is_fav = true;
     favorites_array.push('fav!');//adding to favs
     }
    else {
     favImg.src ="./images/star.png"
     is_fav = false;
     favorites_array.pop('fav!');//removing from favs
     }

     console.log('Favs: ' + favorites_array);
}




//stats table stuff
    rowsPerPage = 10;
    currentPage = 1;
    ascendingOrderRequired = true;
    //////SORTING STATISTICS
    function sortStats(parameter) {
    clearTable();
    if (parameter === 'byname') {
    populateTable(parameter_sort(processed_user_array, 1, 0, 0, 0, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'byage') {
    populateTable(parameter_sort(processed_user_array, 0, 1, 0, 0, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'bycountry') {
    populateTable(parameter_sort(processed_user_array, 0, 0, 0, 1, 0, ascendingOrderRequired), currentPage);
    }
    if (parameter === 'byspec') {
    populateTable(parameter_sort(processed_user_array, 0, 0, 0, 0, 1, ascendingOrderRequired), currentPage);
    }
    ascendingOrderRequired = ascendingOrderRequired ? 0 : 1;
    }


function populateTable(array_of_users, page) {
      let table = document.getElementById("table_body_id");

      const startIndex = (page - 1) * rowsPerPage;
      //console.log(startIndex);
      const endIndex = startIndex + rowsPerPage;
       //console.log(endIndex);
      const slicedData = array_of_users.slice(startIndex, endIndex);
      //console.log(slicedData);

      table.innerHTML = "";
  slicedData.forEach(user => {

       let row = table.insertRow(-1);

// Create table cells
      let name = row.insertCell(0);
      let speciality = row.insertCell(1);
      let age = row.insertCell(2);
      let gender = row.insertCell(3);
      let nationality = row.insertCell(4);


      // Add data to cells
            name.innerText = user.full_name;
            speciality.innerText = user.course;
            age.innerText = user.age;
            gender.innerText = user.gender;
            nationality.innerText = user.country;
});

       updatePagination(array_of_users, page);
}

function updatePagination(array_of_users, currentPage) {
            const pageCount = Math.ceil(array_of_users.length / rowsPerPage);
            const paginationContainer = document.getElementById("stats_nav");
            paginationContainer.innerHTML = "";

            for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement("button");
            pageButton.type = "button";
            pageButton.innerText = i;
            pageButton.onclick = function () {
                  populateTable(processed_user_array, i);
             };
             if (i === currentPage) {
                  pageButton.style.fontWeight = "bold";
             }
             paginationContainer.appendChild(pageButton);
             paginationContainer.appendChild(document.createTextNode(" "));

            }
        }

//actually call the table population function
//populateTable(processed_user_array, currentPage);


//SEARCHBAR (used inside HTML)
function searchForTeacher() {
//console.log(processed_user_array);
//getResponse.then(function(arr) {
      const input = document.getElementById("search_field");
      const search_parameter = input.value;
      const found_users = find_user(processed_user_array, search_parameter);
      console.log(found_users);
      //actually show found teachers
      //take array made by find_user(...) and put it into the function below
     // console.log("in searchForTeacher()");
     cleanUpTeachers();
     loadUpTeachers(found_users);
     console.log(calculate_statistics(found_users, search_parameter) + "%");
//});
}


function filterByOptions() {
regionControl = document.getElementById("region_control");
optionRegion = regionControl.options[regionControl.selectedIndex].value;
console.log(optionRegion);

ageControl = document.getElementById("age_control");
optionAge = ageControl.options[ageControl.selectedIndex].value;
const ageMin = optionAge.slice(0, 2);
console.log(ageMin);
const ageMax = optionAge.slice(2, 4);
console.log(ageMax);

sexControl = document.getElementById("sex_control");
optionSex = sexControl.options[sexControl.selectedIndex].value;
console.log(optionSex);

favoriteControl = document.getElementById("favorite_control");
tickFav = favoriteControl.checked;
console.log(tickFav);

console.log(parameter_filter(processed_user_array, optionRegion, ageMin, ageMax, optionSex, tickFav));
cleanUpTeachers();
loadUpTeachers(parameter_filter(processed_user_array, optionRegion, ageMin, ageMax, optionSex, tickFav));
}



//
////add teacher popup button event
function addNewTeacher() {

}



//LAB 4

//TASK 1: get request: 50 users from https://randomuser.me/api
async function getOurUsers(amount) {
dummy_arr = [];
do {
 try {
 const response = await fetch('https://randomuser.me/api');
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
     //console.log(data);
     dummy_arr.push(data.results[0]);
 } catch (error) {
          console.error(error);
        }
        } while (dummy_arr.length < amount);

        return dummy_arr;
}

getResponse = getOurUsers(50);
getResponse.then(function(arr) {
acquired_users_array = format_data(arr, []);
validate_users(acquired_users_array);

console.log('length: ' + acquired_users_array.length);
console.log(acquired_users_array);

//put users into the page
const dataElement = document.querySelector('.searched-teacher-list');
acquired_users_array.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})

populateTable(acquired_users_array, currentPage);

});


function requestMoreTeachers() {
extra_teachers_array = [];

getOurUsers(10).then(function(arr) {
format_data(arr, []);
//console.log(processed_user_array);

cleanUpTeachers();
clearTable();

const dataElement = document.querySelector('.searched-teacher-list');
processed_user_array.map(user => {
dataElement.insertAdjacentHTML('afterbegin', `

        <div class="teacher-item" id=${user.id} onclick="openTeacherInfo(this.id)">
            <div class="image-box">
                <img class="teacher-image" src=${user.picture_thumbnail}>
                <span class="teacher-initials">I.T</span>
            </div>
            <div class="teacher-item-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-spec">${user.course}</p>
                <p class="teacher-region">${user.country}</p>
            </div>
        </div>
`)
})

populateTable(processed_user_array, currentPage);

});
}
