const router = require('express').Router();

const {
  createUser, findUsers, findUser, updateUser, updateAvatar,
} = require('../controllers/users');


router.get('/:id', findUser);
router.post('/', createUser);
router.get('/', findUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
