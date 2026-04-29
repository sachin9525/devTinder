const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the user from req cookies
    const { token } = req.cookies;
    // Validate the token
    if (!token) {
      throw new Error("Invalid Token!!!");
    }

    const decodeObj = await jwt.verify(token, "DEV@Tinder$999");
    const { _id } = decodeObj;

    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};


module.exports = {
  userAuth,
};
