const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const isAuth = require("./middleware/isAuth");

router.get("/", isAuth, bookController.getAdminChapter);
router.post("/create", isAuth, bookController.createChapter);
router.delete("/:id", isAuth, bookController.deleteChapter);

module.exports = router;
