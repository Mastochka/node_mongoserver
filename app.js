/* eslint-disable import/no-dynamic-require */
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5ec540cd8f9dd06c50b5e699',
  };

  next();
});
const users = require(path.join(__dirname, './routes/users.js'));
const cards = require(path.join(__dirname, './routes/cards.js'));
const missingLink = require(path.join(__dirname, './routes/missingLink.js'));
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', users);
app.use('/cards', cards);
app.use('/*', missingLink);
app.listen(port, () => {});
