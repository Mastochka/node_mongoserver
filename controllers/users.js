const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) res.send({ data: user });
      else res.status(404).send({ error: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Несуществующий объект' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({
          data: {
            _id: user._id, about: user.about, avatar: user.avatar, email: user.email,
          },
        }))
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(400).send({ message: 'Пользователь с такой почтой уже существует' });
          }
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Ошибка валидации', error: err.message });
          }
          return res.status(500).send({ message: 'Произошла ошибка' });
        });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ message: `Аватар обновлен на ${user.avatar}` }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || 'dev-secret-key',
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          }).end();
        })
        .catch((err) => res.status(401).send({ message: err.message }));
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
