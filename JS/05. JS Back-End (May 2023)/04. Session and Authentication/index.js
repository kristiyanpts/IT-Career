const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);

require("./config/database")()
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(`DB Error: ${err}`));

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);
