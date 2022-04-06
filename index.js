require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authController = require("./controllers/authController");
const methodOverride = require("method-override");

const app = express();
const dailyArticleRouter = require("./routes/dailyArticles");
const homepageRoute = require("./routes/home");
const adminBooks = require("./routes/adminBooks");
const adminChapter = require("./routes/adminChapter");
const auth = require("./routes/auth");
const bible = require("./routes/bible");

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-type",
    "Authorization",
    "Origin",
    "Access-Control-Allow-Origin",
    "Accept",
    "Options",
    "X-Requested-With",
  ],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const store = new MongoDBStore({
  uri: "mongodb+srv://artak:Pass4artak@cluster0.anqvu.mongodb.net/watchtower?retryWrites=true&w=majority",
  collection: "auth-sessions",
});

app.use(
  session({
    secret: "bible",
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);

app.use(authController.saveUserSession);

app.use("/admin/daily", dailyArticleRouter);
app.use("/admin/books", adminBooks);
app.use("/admin/chapter", adminChapter);
app.use("/admin", auth);
app.use("/bible", bible);

app.use(homepageRoute);

const start = async () => {
  console.log(`listening to port ${PORT}`);
  try {
    await mongoose.connect(
      "mongodb+srv://artak:Pass4artak@cluster0.anqvu.mongodb.net/watchtower?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
};
start();
