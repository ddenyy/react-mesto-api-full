const router = require('express').Router();
const routersUser = require('./userRoute');
const routersCard = require('./cardRoute');
const { login, createUser } = require('../controllers/userController');
const { signUpValidation, signInValidation } = require('../middlewares/validations');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth')

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

// middleware для проверки авторизаци пользователя
router.use(auth);
// роуты которым нужна авторизация
router.use(routersUser);
router.use(routersCard);

// обработка некорректного машрута
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;