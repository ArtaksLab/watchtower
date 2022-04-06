const express = require("express");
const router = express.Router();
const dailyArticlesController = require("../controllers/dailyArticles");
const isAuth = require("./middleware/isAuth");
router.get("/", isAuth, dailyArticlesController.getArticles);

router.get("/new", isAuth, (req, res) => {
  res.render("createDailyArticle");
});
router.get("/search", isAuth, dailyArticlesController.searchArticleByDate);

router.get("/:id", isAuth, dailyArticlesController.showArticle);

router.put("/:id", isAuth, dailyArticlesController.editArticle);

router.post("/create", isAuth, dailyArticlesController.createArticle);

router.delete("/:id", isAuth, dailyArticlesController.deleteArticle);

module.exports = router;
