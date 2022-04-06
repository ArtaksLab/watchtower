const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/admin/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.authenticated = true;
            req.session.user = user;
            return req.session.save((e) => {
              if (e) return res.redirect("/admin/login");
              res.redirect("/admin/books");
            });
          }

          return res.redirect("/admin/login");
        })
        .catch((e) => {
          console.log(e);
          return res.redirect("/admin/login");
        });
    })
    .catch((e) => res.render("404"));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/admin/login");
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            email,
            password: hashedPassword,
          });
          return newUser.save();
        })
        .then(() => {
          return res.json({ message: "success" });
        })
        .catch((e) => res.json({ message: "Something Went Wrong!" }));
    })
    .catch((e) => res.json({ message: "Something Went Wrong!" }));
};

exports.postLogout = (req, res) => {
  req.session.destroy((e) => {
    res.redirect("/");
  });
};

exports.saveUserSession = (req, res, next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) return next();
      req.user = user;
      next();
    })
    .catch((e) => {
      throw new Error(e);
    });
};
