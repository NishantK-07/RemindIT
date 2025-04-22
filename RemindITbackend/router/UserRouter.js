const express = require("express");
const UserRouter = express.Router();
const { getCurrentUser } = require("../controller/UserController");
const { protecdrouteMiddleware } = require("../controller/AuthController");
/***********routes**************/
/**********users*****/
UserRouter.use(protecdrouteMiddleware);

UserRouter.get("/", getCurrentUser);
module.exports = UserRouter;