const testModules = require('./test-module');
require('../css/app.css');

const userFile = require('./random-user-mock.js');
//formattedUserFile = require('./formatted-user-mock.js');


user_array = [];
processed_user_array = [];

//Reformats data from random-user-mock.js into needed format
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

formattedUser.b_date = define(user.b_date);
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
return processed_user_array
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


//call function
console.log(format_data(userFile.randomUserMock, userFile.additionalUsers));

console.log(testModules.hello);
