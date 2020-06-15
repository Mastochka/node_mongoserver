const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

module.exports = router;
router.all('/', (req, res, next) => Promise.reject(new NotFoundError('Не существующий адрес'))
  .catch(next));
