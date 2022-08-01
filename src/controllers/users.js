const User = require("../models/user");
const {
  sendErrorIncorrectCreateProfile,
  sendErrorIncorrectUpdateProfile,
  sendErrorIncorrectUpdateAvatar,
  sendErrorProfileNotFound,
  sendErrorDefault,
} = require("../utils/utils");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectCreateProfile(res);
        return;
      }
      sendErrorDefault(res);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      sendErrorDefault(res);
    });
};

module.exports.qetUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        sendErrorProfileNotFound(res);
        return;
      }
      sendErrorDefault(res);
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
    }
  )
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectUpdateProfile(res);
        return;
      }
      if (err.name === "CastError") {
        sendErrorProfileNotFound(res);
        return;
      }
      sendErrorDefault(res);
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
    }
  )
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendErrorIncorrectUpdateAvatar(res);
        return;
      }
      if (err.name === "CastError") {
        sendErrorProfileNotFound(res);
        return;
      }
      sendErrorDefault(res);
    });
};
