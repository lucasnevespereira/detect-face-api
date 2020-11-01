const bcrypt = require("bcrypt");
const db = require("../config/db");

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

exports.index = (req, res) => {
  res.send(database.users);
};

exports.signin = (req, res) => {
  // bcrypt.compare(
  //   req.body.password,
  //   hash,
  //   (err, res) => {
  //     console.log(res);
  //   }
  // );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
};

exports.register = (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (!err) {
      console.log(hash);
    }
  });

  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
};

exports.profile = (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("user not found");
  }
};

exports.image = (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("user not found");
  }
};
