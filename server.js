const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routes = require("./routes/routes");

app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => {
  console.log("app is running");
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user 
/image --> PUT --> user
*/
