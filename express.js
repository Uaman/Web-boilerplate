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
  res.render('teachers', { teacher: teachers });
});

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
