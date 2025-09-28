import { Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';

let db: Db;

export const initDB = (database: Db) => {
  db = database;
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;
    const result = await db.collection('users').insertOne(newUser);
    res
      .status(201)
      .json({ message: 'User created', userId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const fillUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = req.body.users;
    const result = await db.collection('users').insertMany(users);
    res
      .status(201)
      .json({ message: 'Users created', userIds: result.insertedIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating users' });
  }
};

export const makeFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, favorite } = req.body;
    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { favorite } });
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User favorite status updated' });
    } else {
      res.status(404).json({ message: 'User not found with id: ' + userId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating favorite status' });
  }
};
