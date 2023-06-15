const router = require("express").Router();
const { isGuest, hasUser } = require("../middlewares/guards");
const userService = require("../services/userService");
const { parseError } = require("../utils/parser");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (
      req.body.password == "" ||
      req.body.description == "" ||
      req.body.email == ""
    )
      throw new Error("All fields are required");
    if (req.body.password.length < 5)
      throw new Error("Password must be at least 5 characters long");
    if (req.body.password != req.body.repass)
      throw new Error("Passwords do not match");

    const token = await userService.register(
      req.body.email,
      req.body.password,
      req.body.description
    );

    res.cookie("authToken", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("register", {
      errors,
      body: {
        email: req.body.email,
        description: req.body.description,
      },
    });
  }
});

router.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    if (req.body.email == "" || req.body.password == "")
      throw new Error("All fields are required");

    const token = await userService.login(req.body.email, req.body.password);

    res.cookie("authToken", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("login", {
      errors,
      body: {
        email: req.body.email,
      },
    });
  }
});

router.get("/logout", hasUser(), (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/");
});

module.exports = router;
