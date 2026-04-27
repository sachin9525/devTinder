const mongoose = require("mongoose");

const mongoDB = async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/devTinder",
  );
};

module.exports = mongoDB
