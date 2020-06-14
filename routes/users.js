const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, findUsers, findUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.get('/users', findUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = router;
