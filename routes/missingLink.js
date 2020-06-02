const router = require('express').Router();

module.exports = router;
router.get('/', (req, res) => {
  res.status(404).send({ message: 'Несуществующий адрес' });
});
