const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const auth = require('./middlewares/auth');
const { INTERNAL_SERVER_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  console.log('db connect');
};

main().catch((err) => {
  console.log(err);
});

app.use(userRouter);
app.use(auth);
app.use(cardRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`);
});
