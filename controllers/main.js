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

  const hash = bcrypt.hashSync(password, 10);

  // transactions keep databases consistent to avoid failures
  // all queries in a transaction run at the same time and if one fails they all fail
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

exports.profile = (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      }
    })
    .catch((err) => {
      res.status(400).json("unable to get user");
    });
};

exports.image = (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};
