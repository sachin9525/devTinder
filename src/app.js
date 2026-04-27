const express = require("express");
const mongoDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data save in db");
  } catch (error) {
    res.status(400).send("Data not save in db", +error.message);
  }
});

// Get User by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong");
  }
});

//Feed API - GET /feed get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Somthing went wrong");
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
