const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5ec540cd8f9dd06c50b5e699',
  };
  next();
});
const users = require('./routes/users');
const cards = require('./routes/cards');
const missingLink = require('./routes/missingLink');

const { PORT, DATABASE_URL } = require('./config.js');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', users);
app.use('/cards', cards);
app.use('/*', missingLink);
app.listen(PORT, () => {});
