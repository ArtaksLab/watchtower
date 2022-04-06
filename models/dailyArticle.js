const { Schema, model } = require("mongoose");

const dailyArticleSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model("DailyArticle", dailyArticleSchema);
