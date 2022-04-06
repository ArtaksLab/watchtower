const { check, body } = require("express-validator");

module.exports = {
  signup: [
    check("email").normalizeEmail().isEmail(),
    body(
      "password",
      "Password must be at least 5 character length consisting only alphanumeric characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      })
      .trim(),
  ],
  login: [
    body(
      "password",
      "Password must be at least 5 character length consisting only alphanumeric characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
};
