/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const {
  createCard, findCards, deleteCard, dislikeCard, likeCard,
} = require(path.join(__dirname, '../controllers/cards'));

router.get('/', findCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
module.exports = router;
