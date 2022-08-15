const userRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
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

userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30),
    about: Joi.string().min(3).max(30),
    avatar: Joi.string()
      .pattern(/^((https|http):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUser);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), auth, qetUserById);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30),
    about: Joi.string().min(3).max(30),
  }),
}), auth, updateProfile);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(/^((https|http):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), auth, updateAvatar);

module.exports = { userRouter };
