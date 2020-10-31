const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is still working!");
});

module.exports = router;
