const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Необходимо ввести имя пользователя'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Необходимо ввести информацию о пользователе'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Необходимо ввести ссылку на аватар'],
  },
});

module.exports = mongoose.model('user', userSchema);
