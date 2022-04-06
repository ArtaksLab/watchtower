const express = require("express");
const router = express.Router();
const dailyArticlesController = require("../controllers/dailyArticles");

router.get("/", dailyArticlesController.dailyArticle);

module.exports = router;
