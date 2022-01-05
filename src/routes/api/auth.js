const express = require("express");
const router = express.Router();
const {
  signupValidate,
  signinValidate,
  checkSubscription,
} = require("../../middlewares/userValidation.js");
const authControllers = require("../../controllers/authControllers.js");
const auth = require("./../../middlewares/checkToken.js");

router.post("/signin", signinValidate, authControllers.find);
router.post("/signup", signupValidate, authControllers.create);
router.post("/logout", auth, authControllers.logout);
router.get("/current", auth, authControllers.getUser);
router.patch("/", checkSubscription, auth, authControllers.updateSubscription);

module.exports = router;
