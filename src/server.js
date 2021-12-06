import './config.js';
import './db-connect.js';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { signupRouter } from './routers/signupRouter.js';
import { loginRouter } from './routers/loginRouter.js';

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
  })
);
// app.use(cors());
app.use(express.json());

app.use('/signup', signupRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});

app.use('/login', loginRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
