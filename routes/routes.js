const express = require("express");
const router = express.Router();

const mainCtrl = require("../controllers/main");

router.get("/", mainCtrl.index);

router.post("/signin", mainCtrl.signin);

router.post("/register", mainCtrl.register);

router.get("/profile/:id", mainCtrl.profile);

router.put("/image", mainCtrl.image);

module.exports = router;
