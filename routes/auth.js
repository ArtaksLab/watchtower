const express = require("express");
const router = express.Router();
const authValidations = require("./middleware/auth");
const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.post("/login", authValidations.login, authController.postLogin);
router.post("/signup", authValidations.signup, authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
