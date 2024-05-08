const express = require("express");
const UserController = require("../../controllers/user-contoller");
const router = express.Router();
const { AuthRequestValidator } = require("../../middlewares/index");
router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.signin
);

router.get("/isAuthenticated", UserController.isAuthenticated);
module.exports = router;
