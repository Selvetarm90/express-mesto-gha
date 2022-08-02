const User = require('../models/user');
const { sendError } = require('../utils/utils');

const { BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(
          res,
          BAD_REQUEST,
          'Переданы некорректные данные',
        );
        return;
      }
      sendError(res);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      sendError(res);
    });
};

module.exports.qetUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        sendError(res, NOT_FOUND, 'Пользователь по указанному ID не найден.');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID.');
        return;
      }
      sendError(res);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        sendError(res, NOT_FOUND, 'Пользователь по указанному ID не найден.');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(res, BAD_REQUEST, 'Переданы некорректные данные');
        return;
      }
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID.');
        return;
      }
      sendError(res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        sendError(res, NOT_FOUND, 'Пользователь по указанному ID не найден.');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(res, BAD_REQUEST, 'Переданы некорректные данные');
        return;
      }
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID.');
        return;
      }
      sendError(res);
    });
};
