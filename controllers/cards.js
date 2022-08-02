const Card = require('../models/card');
const { sendError } = require('../utils/utils');

const { BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(res, BAD_REQUEST, 'Переданы некорректные данные');
        return;
      }
      sendError(res);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch(() => {
      sendError(res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        sendError(res, NOT_FOUND, 'Карточка по указанному ID не найдена');
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID');
        return;
      }
      sendError(res);
    });
};

module.exports.addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, NOT_FOUND, 'Карточка по указанному ID не найдена');
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID');
        return;
      }
      sendError(res);
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, NOT_FOUND, 'Карточка по указанному ID не найдена');
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendError(res, NOT_FOUND, 'Некорректный ID');
        return;
      }
      sendError(res);
    });
};
