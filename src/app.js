const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent")
})

app.get("/user", userAuth, (req, res) => {
  res.send("Valid User Id")
})

app.listen(7777, () => {
  console.log("Server running on port 7777");
});

  