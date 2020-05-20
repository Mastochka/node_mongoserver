/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();

const path = require('path');

const {
  createUser, findUsers, findUser, updateUser, updateAvatar,
} = require(path.join(__dirname, '../controllers/users'));

router.get('/:id', findUser);
router.post('/', createUser);
router.get('/', findUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
module.exports = router;
