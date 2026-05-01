const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
// const { Connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const allowedstatus = ["ignored", "intrested"];
      if (!allowedstatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type " + status,
        });
      }

      // If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      // If there no user
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found!!!" });
      }

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection Request Already Exists",
        });
      }

      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  },
);

module.exports = requestRouter;
