const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '62e398774d0d13d6ff541a0c',
  };

  next();
});

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  });
  console.log('db connect');
};

main().catch((err) => {
  console.log(err);
});

app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`);
});
