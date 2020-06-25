// eslint-disable-next-line consistent-return
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Ошибка валидации', error: message });
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с этой почтой уже существует' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Ошибочный запрос' });
  }
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
