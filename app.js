const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const cards = require('./routes/cards');
const missingLink = require('./routes/missingLink');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const { PORT, DATABASE_URL } = require('./config');

const { createUser, login } = require('./controllers/users');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.post('/signin', login);
app.post('/', createUser);
app.use(auth);
app.use('/', users);
app.use('/cards', cards);
app.use('/*', missingLink);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
