const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' && err.message.includes('link')) {
        return res.status(400).send({ message: 'Неправильная ссылка на картинку' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.findCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточки не существует' });
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return res.status(403).send({ message: 'Нет доступа' });
      }
      res.send({ message: 'Карточка удалена' });
      return card.remove();
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
