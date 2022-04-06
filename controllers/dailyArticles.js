const DailyArticle = require("../models/dailyArticle");
const format = require("date-fns/format");
const { addDays, subDays } = require("date-fns");

exports.getArticles = async (req, res) => {
  try {
    const articles = await DailyArticle.find().sort({ date: -1 }).limit(20);

    return res.render("dailyArticles", { articles: articles });
  } catch (e) {
    return res.render("dailyArticles", { articles: [] });
  }
};
exports.searchArticleByDate = async (req, res) => {
  try {
    let articles = [];
    if (req.query.date) {
      articles = await DailyArticle.find({ date: req.query.date });
    } else {
      articles = await DailyArticle.find().sort({ date: -1 }).limit(20);
    }

    return res.render("dailyArticles", { articles: articles });
  } catch (e) {
    return res.render("dailyArticles", { articles: [] });
  }
};

exports.createArticle = async (req, res) => {
  let article = new DailyArticle({
    date: req.body.date,
    description: req.body.description,
    content: req.body.content,
  });

  try {
    article = await article.save();
    return res.redirect(`/admin/daily`);
  } catch (e) {
    return res.redirect(`/admin/daily`);
  }
};
exports.showArticle = async (req, res) => {
  const article = await DailyArticle.findById(req.params.id);
  res.render("show", {
    article,
    error: false,
    formatedDate: format(article.date, "yyyy-MM-dd"),
  });
};

exports.editArticle = async (req, res, next) => {
  let article = await DailyArticle.findById(req.params.id);
  console.log(article);
  article.title = req.body.title;
  article.description = req.body.description;
  article.content = req.body.content;
  try {
    article = await article.save();
    res.redirect(`/admin/daily`);
  } catch (e) {
    res.render(`show`, {
      article: article,
      error: "something went wrong!",
      formatedDate: format(article.date, "yyyy-MM-dd"),
    });
  }
};

exports.deleteArticle = async (req, res) => {
  await DailyArticle.findByIdAndDelete(req.params.id);
  res.redirect("/admin/daily");
};

exports.dailyArticle = async (req, res) => {
  let date = req.query.date ? req.query.date : format(new Date(), "yyyy-MM-dd");

  if (req.query.day === "n") {
    date = format(addDays(new Date(date), 1), "yyyy-MM-dd");
  } else if (req.query.day === "p") {
    date = format(subDays(new Date(date), 1), "yyyy-MM-dd");
  }

  try {
    const article = await DailyArticle.findOne({ date: date });
    if (article) {
      return res.render("homepage", {
        article: article,
        currentTab: "home",
        title: format(new Date(date), "eeee, MMMM dd"),
        date: date,
      });
    } else {
      const article = await DailyArticle.findOne();

      return res.render("homepage", {
        article: article,
        currentTab: "home",
        title: format(new Date(date), "eeee, MMMM dd"),
        date: date,
      });
    }
  } catch (error) {
    return res.render("404");
  }
};
