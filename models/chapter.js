const { Schema, model } = require("mongoose");

const chapterSchema = Schema({
  chapter: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Chapter = model("Chapter", chapterSchema);

Chapter.ensureIndexes(function (err) {
  if (err) return error;
});

module.exports = Chapter;
