const express = require("express");
const mongoDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "Kumar",
    emailId: "sachin@1456",
    password: "sa798665555",
  });

  try {
    await user.save();
    res.send("Data save in db");
  } catch (error) {
    res.status(400).send("Data not save in db", +error.message);
  }
});

mongoDB()
  .then(() => {
    console.log("Database Connected..");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => console.log("Database connection failed", err));
