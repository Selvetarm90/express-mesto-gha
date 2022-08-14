const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createUser,
  getUsers,
  getUser,
  qetUserById,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

userRouter.post('/signup', createUser);
userRouter.post('/signin', login);
userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUser);
userRouter.get('/users/:userId', auth, qetUserById);
userRouter.patch('/users/me', auth, updateProfile);
userRouter.patch('/users/me/avatar', auth, updateAvatar);

module.exports = { userRouter };
