const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./config/db");
const routes = require("./routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(db);
app.use(routes);

app.listen(5000, () => {
  console.log("app is running");
});
