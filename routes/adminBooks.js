const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const isAuth = require("./middleware/isAuth");

router.get("/", isAuth, bookController.getAdminBooks);

router.get("/new", isAuth, bookController.getCreateBook);

router.post("/create", isAuth, bookController.createBook);

router.get("/:id", isAuth, bookController.getBookById);

router.delete("/:id", isAuth, bookController.deleteBook);

module.exports = router;
