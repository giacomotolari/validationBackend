import '../config.js';
import bcrypt from 'bcrypt';
import express from 'express';
import * as signupController from '../controllers/signupController.js';

const saltRounds = Number(process.env.SALT_ROUNDS);
// const myPlaintextPassword = process.env.MY_PASSWORD;

const signupRouter = express.Router();


// READ ALL
signupRouter.get('/', async (_req, res) => {
    const users = await signupController.readAllUsers();
    res.json(users);
  });
  

// CREATE
signupRouter.post('/create', async (req, res) => {
  const userObj = req.body;
  userObj.password1 !== userObj.password2
    ? res.status(500).send('error')
    : bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(userObj.password1, salt, async (err, hash) => {
          const dbUser = {
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            userName: userObj.userName,
            hash,
            email: userObj.email,
          };
          const result = await signupController.createUser(dbUser);
          res.json({
            result,
          });
        });
      });
});


// READ ONE
signupRouter.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  res.json({
    user: await signupController.readOneUser(id),
  });
});

// UPDATE
signupRouter.patch('/update/:id', async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  const result = await signupController.updateUser(id, updateFields);
  res.json({
    result,
  });
});

// DELETE
signupRouter.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  const result = await signupController.deleteUser(id);
  res.json({
    result,
  });
});

export { signupRouter };
