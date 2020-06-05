const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const users = require('./routes/users');
const cards = require('./routes/cards');
const missingLink = require('./routes/missingLink');
const auth = require('./middlewares/auth');
const { PORT, DATABASE_URL } = require('./config');

const { createUser, login } = require('./controllers/users');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use('/*', missingLink);
app.listen(PORT, () => {});
