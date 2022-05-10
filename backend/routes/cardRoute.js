const router = require('express').Router();
const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validations');

const {
  getCard,
  removeCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');

router.get('/cards', getCard);
router.delete('/cards/:cardId', cardIdValidation, removeCardById);
router.post('/cards', createCardValidation, createCard);
router.put('/cards/:cardId/likes', cardIdValidation, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
