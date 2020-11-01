const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routes = require("./routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
