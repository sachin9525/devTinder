const express = require("express");
const mongoDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

mongoDB()
  .then(() => {
    console.log("Database Connected..");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => console.log("Database connection failed", err));
