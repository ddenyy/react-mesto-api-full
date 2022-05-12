require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
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

const { PORT = 3000 } = process.env;

const app = express();
// подключение к бд
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

app.use(limiter);

// подключаем обработку приходящих данных
app.use(express.json());
// подключаем обработку куки, все куки лежат в req.cookie
app.use(cookieParser());
// подключаем валидацию запросов чтоб проходил проверку CORS
app.use(cors);
// настраиваем заголовки
app.use(helmet());
// подключаем логгер запросов
app.use(requestLogger);
app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

// middleware для проверки авторизаци пользователя
app.use(auth);
// роуты которым нужна авторизация
app.use(routersUser);
app.use(routersCard);
// подключаем логгер ошибок
app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);
