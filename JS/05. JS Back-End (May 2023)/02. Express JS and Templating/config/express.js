const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

module.exports = (app) => {
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(bodyParser.urlencoded({ extended: false }));

  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "views");
};
