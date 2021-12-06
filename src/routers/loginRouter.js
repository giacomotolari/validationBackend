import '../config.js';
import express from 'express';
// import * as loginController from '../controllers/loginController.js';
import LoginModel from '../models/loginModel.js';

const loginRouter = express.Router();

loginRouter.get('/user', async (req, res) => {
  const user = await LoginModel.find({});
  res.json(user);
});

loginRouter.post('/', async (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;
  let user = await LoginModel.findOne({ username: username });
  if (!user) {
    user = await LoginModel.findOne({ username: 'anonymousUser' });
  }
  req.session.user = user;
  req.session.save();
  res.json(user);
});

loginRouter.get('/currentuser', async (req, res) => {
  let user = req.session.user;
  if (!user) {
    user = await LoginModel.findOne({ username: 'anonymousUser' });
  }
  res.json(user);
});

loginRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  const user = await LoginModel.findOne({ username: 'anonymousUser' });
  res.json(user);
});

export { loginRouter };
