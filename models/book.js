const { Schema, model } = require("mongoose");

const bookSchema = Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  chapters: {
    type: Number,
    required: false,
  },
});

module.exports = model("Book", bookSchema);
