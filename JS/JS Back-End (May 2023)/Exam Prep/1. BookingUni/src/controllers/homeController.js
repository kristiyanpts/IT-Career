const router = require("express").Router();

// TODO: Replace with real controller
router.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
  });
});

module.exports = router;