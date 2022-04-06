const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/search", bookController.searchByKeyword);

router.get("/chapter", bookController.getChapter);

router.get("/:id", bookController.getBookChaptersById);

router.get("/", bookController.getBooks);

module.exports = router;
