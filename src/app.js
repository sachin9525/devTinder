const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params)
  res.send("Get User Details");
});

app.listen(7777, () => {
  console.log("Server running on port 7777");
});
