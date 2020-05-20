const router = require('express').Router();

module.exports = router;
router.get('/', (req, res) => {
  res.status(500).send({ message: 'Несуществующий адрес' });
});
