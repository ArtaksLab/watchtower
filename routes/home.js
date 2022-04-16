const express = require("express");
const router = express.Router();
const dailyArticlesController = require("../controllers/dailyArticles");

router.get("/privacy", (req, res) => {
  res.render("privacy", { currentTab: "" });
});
router.get("/", dailyArticlesController.dailyArticle);

module.exports = router;
