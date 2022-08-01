const Card = require("../models/card");
const {
  sendErrorIncorrectCreateCard,
  sendErrorCardNotFound,
  sendErrorIncorrectAddlikeCard,
  sendErrorIncorrectDeletelikeCard,
  sendErrorDefault,
} = require("../utils/utils");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectCreateCard(res);
        return;
      }
      sendErrorDefault(res);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send({ data: data });
    })
    .catch(() => {
      sendErrorDefault(res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        sendErrorCardNotFound(res);
      }
      return;
    });
    sendErrorDefault(res);
};

module.exports.addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectAddlikeCard(res);
        return;
      }
      if (err.name === "CastError") {
        sendErrorCardNotFound(res);
        return;
      }
      sendErrorDefault(res);
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectDeletelikeCard(res);
        return;
      }
      if (err.name === "CastError") {
        sendErrorCardNotFound(res);
        return;
      }
      sendErrorDefault(res);
    });
};
