const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const Knex = require("knex");
require("dotenv").config();

const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");
const image = require("./controller/image");

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
app.get("/", (req, res) => {
  res.json("Success.");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfileGet(db));

app.put("/image", (req, res) => {
  image.handleImagePut(req, res, db);
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
