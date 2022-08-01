const sendErrorIncorrectCreateProfile = (res) => {
  res.status(400).send({
    message: "Переданы некорректные данные при создании пользователя.",
  });
};

const sendErrorIncorrectUpdateProfile = (res) => {
  res.status(400).send({
    message: "Переданы некорректные данные при обновлении профиля.",
  });
};

const sendErrorIncorrectUpdateAvatar = (res) => {
  res.status(400).send({
    message:
      "Переданы некорректные данные при обновлении аватара пользователя.",
  });
};

const sendErrorProfileNotFound = (res) => {
  res.status(404).send({
    message: "Пользователь по указанному ID не найден.",
  });
};

const sendErrorDefault = (res) => {
  res.status(500).send({ message: "Непредвиденная ошибка." });
};

const sendErrorIncorrectCreateCard = (res) => {
  res.status(400).send({
    message: "Переданы некорректные данные при создании карточки.",
  });
};

const sendErrorCardNotFound = (res) => {
  res.status(404).send({
    message: "Карточка с указанным ID не найдена.",
  });
};

const sendErrorIncorrectAddlikeCard = (res) => {
  res.status(400).send({
    message: "Переданы некорректные данные при добавлении лайка карточке.",
  });
};

const sendErrorIncorrectDeletelikeCard = (res) => {
  res.status(400).send({
    message: "Переданы некорректные данные при удалении лайка карточки.",
  });
};

module.exports = {
  sendErrorIncorrectCreateProfile,
  sendErrorIncorrectUpdateProfile,
  sendErrorIncorrectUpdateAvatar,
  sendErrorProfileNotFound,
  sendErrorIncorrectCreateCard,
  sendErrorCardNotFound,
  sendErrorIncorrectAddlikeCard,
  sendErrorIncorrectDeletelikeCard,
  sendErrorDefault,
};
