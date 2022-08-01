const userRouter = require("express").Router();
const { createUser, getUsers, qetUserById, updateProfile, updateAvatar } = require("../controllers/users");

userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", qetUserById);
userRouter.patch("/users/me", updateProfile);
userRouter.patch("/users/me/avatar", updateAvatar)

module.exports = { userRouter };