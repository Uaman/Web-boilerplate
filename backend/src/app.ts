import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import bodyParser from 'body-parser';
import AppRouter from './routes';

import cors from 'cors';
import { initDB } from './controllers/user.controller';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.MONGO_URI || '';
console.log('uri: ', uri);
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');

    const db = client.db('TeachinderDB');
    initDB(db);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

router.init();

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Now listening on port ${port}`);
});
