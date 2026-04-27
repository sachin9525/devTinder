const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    String,
  },
});


module.exports = mongoose.model("User", userSchema)