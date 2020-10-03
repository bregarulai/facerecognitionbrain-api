const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const Knex = require("knex");
require("dotenv").config();

const db = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
  },
});

const app = express();

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
    {
      id: "123",
      hash: "",
      email: "sally@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  /*
  bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
  });
  bcrypt.compare("veggies", hash, function (err, res) {
    // res = false
  });
  */
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error login in!");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  /*
  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
  });
  */
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
    .catch((err) => res.status(400).json("Unable to register."));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User not found.");
      }
    })
    .catch((err) => {
      res.status(400).json("Error getting user.");
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to get entries.");
    });
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
