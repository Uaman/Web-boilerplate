const testModules = require('./test-module');
require('../css/app.css');

const userFile = require('./random-user-mock.js');
const formattedUserFile = require('./formatted-user-mock.js');

/*"gender":"male",
  "title": "Mr",
  "full_name": "Norbert Weishaupt",
  "city":"Rhön-Grabfeld",
  "state":"Mecklenburg-Vorpommern",
  "country":"Germany",
  "postcode":52640,
  "coordinates":{"latitude":"-42.1817","longitude":"-152.1685"},
  "timezone":{"offset":"+9:30","description":"Adelaide,Darwin"},
  "email":"norbert.weishaupt@example.com",
  "b_date":"1956-12-23T19:09:19.602Z",
  "age":65,
  "phone":"0079-8291509",
  "picture_large":"https://randomuser.me/api/portraits/men/28.jpg",
  "picture_thumbnail":"https://randomuser.me/api/portraits/thumb/men/28.jpg"
*/

//Reformats data from random-user-mock.js into needed format
function format_data(random, additional) {
//console.log(rawData.name);
const userArray = [];
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

 userArray.push(formattedUser);
});

//userArray.push(...);//writing data into array

return userArray;//returns the final array
}

//userFile.randomUserMock.forEach(user => {
//    format_data(user);
//  });

//call function

console.log(format_data(userFile.randomUserMock, userFile.additionalUsers));

console.log(testModules.hello);
