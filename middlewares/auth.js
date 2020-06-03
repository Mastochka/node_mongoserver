const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
