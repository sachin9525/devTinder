const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sentConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Sent Connection Request");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = requestRouter;
