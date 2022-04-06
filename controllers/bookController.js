const e = require("express");
const Book = require("../models/book");
const Chapter = require("../models/chapter");

const bookTypes = {
  hebrew_aramaic_scriptures: "HEBREW-ARAMAIC SCRIPTURES",
  christian_greek_scriptures: "CHRISTIAN GREEK SCRIPTURES",
};

exports.getAdminBooks = async (req, res) => {
  try {
    const data = [];

    const hebrew_aramaic_scriptures = await Book.find({
      type: "hebrew_aramaic_scriptures",
    });

    const christian_greek_scriptures = await Book.find({
      type: "christian_greek_scriptures",
    });

    if (hebrew_aramaic_scriptures?.length) {
      data.push({
        label: bookTypes["hebrew_aramaic_scriptures"],
        book: hebrew_aramaic_scriptures,
      });
    }

    if (christian_greek_scriptures?.length) {
      data.push({
        label: bookTypes["christian_greek_scriptures"],
        book: christian_greek_scriptures,
      });
    }

    res.render("adminBooks", { data: data });
  } catch (e) {
    return res.render("404");
  }
};

exports.createBook = async (req, res) => {
  if (req.body.type && bookTypes[req.body.type]) {
    let book = new Book({
      type: req.body.type,
      title: req.body.title,
      chapters: req.body.chapters,
      label: req.body.label,
      color: req.body.color,
    });
    try {
      await book.save();
      return res.redirect("/admin/books");
    } catch (e) {
      return res.render("createBook", { error: "Something went wrong!" });
    }
  } else {
    return res.render("createBook", { error: "Something went wrong!" });
  }
};

exports.getCreateBook = async (req, res) => {
  try {
    return res.render("createBook");
  } catch (e) {
    return res.render("404");
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    return res.render("adminBook", { book: book });
  } catch (e) {
    return res.render("404");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    await Chapter.remove({ bookId: req.params.id });
    res.redirect(`/admin/books`);
  } catch (e) {
    res.render("404");
  }
};

exports.getAdminChapter = async (req, res) => {
  const chapterNumber = req.query.chapter;
  const bookId = req.query.book;
  if (chapterNumber && bookId) {
    try {
      const book = await Book.findById(bookId);

      let emptyChapter = {
        chapter: chapterNumber,
        content: "",
        title: book.title,
      };

      const chapter = await Chapter.findOne({
        slug: `${chapterNumber}_${bookId}`,
      });

      return res.render("adminChapter", {
        data: chapter ? chapter : emptyChapter,
        bookId: bookId,
      });
    } catch (e) {
      return res.render("404");
    }
  } else {
    return res.render("404");
  }
};

exports.createChapter = async (req, res) => {
  const id = req.body.id;
  if (req.body.chapterNumber && req.body.bookId) {
    try {
      if (id) {
        await Chapter.findByIdAndUpdate(
          id,
          {
            $set: {
              content: req.body.content,
            },
          },
          { new: true }
        );
      } else {
        const book = await Book.findById(req.body.bookId);
        const chapter = new Chapter({
          content: req.body.content,
          slug: `${req.body.chapterNumber}_${req.body.bookId}`,
          title: book.title,
          chapter: req.body.chapterNumber,
          bookId: req.body.bookId,
        });
        await chapter.save();
      }
      res.redirect(`/admin/books/${req.body.bookId}`);
    } catch (e) {
      console.log(e);
      res.redirect(
        `/admin/chapter?book=${req.body.bookId}&chapter=${req.body.chapterNumber}`
      );
    }
  } else {
    res.render("404");
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.redirect(`/admin/books`);
  } catch (e) {
    res.render("404");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const data = [];

    const hebrew_aramaic_scriptures = await Book.find({
      type: "hebrew_aramaic_scriptures",
    });

    const christian_greek_scriptures = await Book.find({
      type: "christian_greek_scriptures",
    });

    if (hebrew_aramaic_scriptures?.length) {
      data.push({
        label: bookTypes["hebrew_aramaic_scriptures"],
        book: hebrew_aramaic_scriptures,
      });
    }

    if (christian_greek_scriptures?.length) {
      data.push({
        label: bookTypes["christian_greek_scriptures"],
        book: christian_greek_scriptures,
      });
    }

    res.render("bible", { data: data, currentTab: "bible" });
  } catch (e) {
    return res.render("404");
  }
};

exports.getBookChaptersById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.render("bookChapters", { book: book, currentTab: "bible" });
  } catch (e) {
    return res.render("404");
  }
};

exports.getChapter = async (req, res) => {
  const chapterNumber = req.query.chapter;
  const bookId = req.query.book;
  if (chapterNumber && bookId) {
    try {
      const book = await Book.findById(bookId);

      let emptyChapter = {
        chapter: chapterNumber,
        content: "",
        title: book.title,
      };

      const chapter = await Chapter.findOne({
        slug: `${chapterNumber}_${bookId}`,
      });

      return res.render("chapter", {
        data: chapter ? chapter : emptyChapter,
        bookId: bookId,
        currentTab: "bible",
      });
    } catch (e) {
      return res.render("404");
    }
  } else {
    return res.render("404");
  }
};

exports.searchByKeyword = async (req, res) => {
  try {
    if (req.body.keyword && req.body.keyword.length > 4) {
      let queries = {
        content: {
          $regex: req.body.keyword,
          $options: "i",
        },
      };
      const items = await Chapter.find(queries).limit(20);
      return res.render("search", { data: items, currentTab: "bible" });
    } else {
      return res.render("search", { data: [], currentTab: "bible" });
    }
  } catch (e) {
    return res.render("404");
  }
};
