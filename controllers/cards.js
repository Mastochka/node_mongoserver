/* eslint-disable import/no-dynamic-require */
const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(404).send({ message: 'Карточки не существует' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send({ message: 'Лайк добавлен' });
      else res.status(404).send({ message: 'Карточки не существует' });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send({ message: 'Лайк удален' });
      else res.status(404).send({ message: 'Карточки не существует' });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
