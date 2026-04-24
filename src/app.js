const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("Home")
})
app.get("/test", (req, res) => {
  res.send("Test")
})

app.get("/login", (req, res) => {
  res.send("Login Page")
})

app.listen(7777, () => {
  console.log("Server running on port 7777")
})