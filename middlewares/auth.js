const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/constants');
const { sendError } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return sendError(res, UNAUTHORIZED, 'Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return sendError(res, UNAUTHORIZED, 'Необходима авторизация');
  }

  req.user = payload;

  next();
};
