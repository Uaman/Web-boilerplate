const express = require('express');
const cors = require('cors');

const app = express();


app.get('/favicon.ico', (req, res) => res.status(200).send());
app.use(express.static('./src'));
app.use(cors());
app.listen(3000, () => console.log('Example app listening on port 3001!'));