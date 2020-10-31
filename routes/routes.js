const express = require("express");
const router = express.Router();

const database = {
  users: [
    {
      id: "123",
      name: "Sally",
      email: "sally@mail.com",
      password: "test",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Peter",
      email: "peter@mail.com",
      password: "test2",
      entries: 0,
      joined: new Date(),
    },
  ],
};

router.get("/", (req, res) => {
  res.send(database.users);
});

router.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

module.exports = router;
