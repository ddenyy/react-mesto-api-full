require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/corsHeaders');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');

// слушаем порт 3000
const { PORT = 3000 } = process.env;

const app = express();
// подключение к бд
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

// подключаем обработку приходящих данных
app.use(express.json());
// подключаем обработку куки, все куки лежат в req.cookie
app.use(cookieParser());
// подключаем валидацию запросов чтоб проходил проверку CORS
app.use(cors);
// настраиваем заголовки
app.use(helmet());
app.use(limiter);
// подключаем логгер запросов
app.use(requestLogger);
// подключаем все роуты
app.use(router);
// подключаем логгер ошибок
app.use(errorLogger);


app.use(errors());
app.use(errorHandler);
