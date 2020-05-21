const router = require('express').Router();

const {
  createCard, findCards, deleteCard, dislikeCard, likeCard,
} = require('../controllers/cards');

router.get('/', findCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
module.exports = router;
