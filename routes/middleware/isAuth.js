module.exports = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.redirect("/admin/login");
  }
  next();
};
