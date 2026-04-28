const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      maxLength: 50,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("invalid email address :" + value)
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
       validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter strong password :" + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
       validate(value){
        if(!validator.isURL(value)){
          throw new Error("invalid photo URL :" + value)
        }
      },
      default:
        "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png",
    },
    about: {
      type: String,
      default: "This is about of user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
