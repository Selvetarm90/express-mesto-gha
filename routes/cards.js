const cardRouter = require("express").Router();
const {
  createCard,
  getCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require("../controllers/cards");

cardRouter.post("/cards", createCard);
cardRouter.get("/cards", getCards);
cardRouter.delete("/cards/:cardId", deleteCard);
cardRouter.put("/cards/:cardId/likes", addLikeCard);
cardRouter.delete("/cards/:cardId/likes", deleteLikeCard);

module.exports = { cardRouter };
