import '../config.js';
import express from 'express';
import * as userController from '../controllers/userController.js';
import UserModel from '../models/userModel.js';
import mongoose from 'mongoose';

const loginRouter = express.Router();

const userIsInGroup = (user, accessGroup) => {
	const accessGroupArray = user.accessGroups.split(',').map(m => m.trim());
	return accessGroupArray.includes(accessGroup);
}
// loginRouter.get('/user', async (req, res) => {
//   const user = await UserModel.find({});
//   res.json(user);
// });

loginRouter.post('/', async (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;
  let user = await UserModel.findOne({ userName: username });
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  req.session.user = user;
  req.session.save();
  res.json(user);
});

loginRouter.get('/currentuser', async (req, res) => {
  let user = req.session.user;
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  res.json(user);
});

loginRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  const user = await UserModel.findOne({ userName: 'anonymousUser' });
  res.json(user);
});

loginRouter.post('/approveduser', async (req, res) => {
  const id = req.body.id;
  let user = req.session.user;
  if (!user) {
    console.log(1,user);
    res.sendStatus(403);
  } else {
    if (!userIsInGroup(user, 'admins')) {
      console.log(2,user);
      res.sendStatus(403);
    } else {
      const updateResult = await UserModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { accessGroups: 'loggedInUsers,members' } },
        { new: true }
      );
      res.json({
        result: updateResult,
      });
    }
  }
});

loginRouter.get('/notyetapprovedusers', async (req, res) => {
  const users = await UserModel.find({
    accessGroups: { $regex: 'notYetApprovedUsers', $options: 'i' },
  });
  res.json({
    users,
  });
});

export { loginRouter };
