const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jsonServerRouter = jsonServer.router('db.json');


app.use('/db', jsonServerRouter);
app.use(express.static('./src'));

app.get('/favicon.ico', (req, res) => res.status(200).send());

app.get('/', (req, res) => res.render('/teachers'));

app.get('/teachers', (req, res) => {
  const { teachers } = JSON.parse(fs.readFileSync('db.json'));
  res.render('teachers');
});

 *           full_name: formData.get('full_name') as string,
                  course: specialityButton.textContent as string,
                  age: parseInt((dateInput as HTMLInputElement).value),
                  gender: formData.get('gender') as string,
                  country: counryButton.textContent as string,
                  city: formData.get('city') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  note: formData.get('note') as string || ' Hi, I am using this platform!',
                  favorite: false, 
                  b_date: dateInput.textContent as string,
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
                  bg_color: (color as HTMLInputElement).value,
 */
app.post('/teachers', (req, res) => {
  const { teachers } = JSON.parse(fs.readFileSync('db.json'));
  const newTeacher = {
    id: req.body.id || Date.now(),
    course: req.body.course,
    full_name: req.body.full_name,
    gender: req.body.gender,
    country: req.body.country,
    city: req.body.city,
    email: req.body.email,
    phone: req.body.phone,
    note: req.body.note,
    favorite: req.body.favorite,
    b_date: req.body.b_date,
    title: req.body.title,
    state: req.body.state,
    postcode: req.body.postcode,
    coordinates: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    timezone: {
      offset: req.body.offset,
      description: req.body.description,
    },
    picture_large: req.body.picture_large,
    picture_thumbnail: req.body.picture_thumbnail,
    picture_medium: req.body.picture_medium,
    region: req.body.region,
    bg_color: req.body.bg_color,
  };
  teachers.push(newTeacher);
  fs.writeFileSync('db.json', JSON.stringify({ teachers }));
  res.send('Teacher added successfully');
});

app.listen(3000, () => console.log('Example app listening on port 3001!'));
