require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routersUser = require('./routes/userRoute');
const routersCard = require('./routes/cardRoute');
const { login, createUser } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const {
  signUpValidation,
  signInValidation,
} = require('./middlewares/validations');
const cors = require('./middlewares/corsHeaders');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const app = express();

// подключение к бд
mongoose.connect('mongodb://localhost:27017/mestodb');

// подключаем обработку приходящих данных
app.use(express.json());
// подключаем обработку куки, все куки лежат в req.cookie
app.use(cookieParser());
// подключаем валидацию запросов чтоб проходил проверку CORS
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// логирование запросов
app.use(requestLogger);

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

// middleware для проверки авторизаци пользователя
app.use(auth);
// роуты которым нужна авторизация
app.use(routersUser);
app.use(routersCard);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// логирование ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
