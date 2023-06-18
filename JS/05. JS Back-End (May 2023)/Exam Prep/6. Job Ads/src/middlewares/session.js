const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  const token = req.cookies["authToken"];
  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.user = userData;
    } catch (error) {
      res.clearCookie("authToken");
      return res.redirect("/auth/login");
    }
  }

  next();
};