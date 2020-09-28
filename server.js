const express = require("express");

const app = express();

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
};

app.get("/", (req, res) => {
  res.json("This is working");
});

app.post("/signin", (req, res) => {
  res.json("signed in");
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});

/* 
    / --> GET = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT = updated user
*/
