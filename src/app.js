const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("Get User Details");
});

app.post("/user", (req, res) => {
  // Save to db
  res.send({ name: "Sachin", city: "Bhopal" });
});
app.delete("/user", (req, res) => {
  res.send("Delete User");
});

app.listen(7777, () => {
  console.log("Server running on port 7777");
});
