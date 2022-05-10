const router = require('express').Router();

const {
  getUser,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userController');
const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validations');

// получить информацию о текущем пользователе
router.get('/users/me', getCurrentUser);
// получить всех пользователей
router.get('/users', getUser);
// получить конкретного пользователя по Id
router.get('/users/:userId', userIdValidation, getUserById);
// создать пользователя
router.post('/users', createUser);
// обновить информацию о текущем пользователе
router.patch('/users/me', updateUserValidation, updateUserData);
// обновить аватар текущего пользователя
router.patch('/users/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = router;
