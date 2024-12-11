import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import User from './models/User.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
  ]
}));
app.use(express.json());

app.get('/', (req, res) => {});

app.get('/films', (req, res) => {});

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.post('/signup', async (req, res) => {
  const { username = '', name = '', password = '' } = req.body;
  const newUser = {
    username,
    name,
    password,
  };

  try {
    const userExists = await User.find({ username }).exec();
    if (userExists.length) return res.json("User already exists");

    const result = await User.create(newUser);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

app.post('/login', async (req, res) => {
  const { username = '', password = '' } = req.body;

  const result = await User.find({ username, password }).exec();
  return res.json(result);
});

app.delete('/delete-all', async (req, res) => {
  const result = await User.deleteMany();
  return res.json(result);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('deu bom'))
  .catch(() => console.log('deu ruim'));