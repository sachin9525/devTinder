const express = require("express");
const mongoDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const { error } = require("node:console");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("Data save in db");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId})
    if(!user){
      throw new Error("Inavalid Credentials😑")
    }
    const isPasswordValid = bcrypt.compare(password, user.password)
    if(isPasswordValid){
      res.send("Login Seccessful🫡!!!")
    }else{
      throw new Error("Inavalid Credentials😑")
    }

  }
  catch(error){
      res.status(400).send("ERROR : " + error.message);
  }
})

// Get User by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong");
  }
});

//Feed API - GET /feed get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Somthing went wrong");
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    res.send("User successfully deleted");
  } catch (error) {
    res.status(400).send("Somthing went wrong");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const UPDATE_ALLOWED = [
      "userId",
      "about",
      "gender",
      "skills",
      "photoUrl",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      UPDATE_ALLOWED.includes(key),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allow");
    }
    // if (data?.skills.length > 10) {
    //   throw new Error("Skills can not be more than 10");
    // }

    const userData = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(userData);
    res.send("Data update successfully");
  } catch (error) {
    res.status(400).send("Somthing went wrong: " + error.message);
  }
});

mongoDB()
  .then(() => {
    console.log("Database Connected..");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => console.log("Database connection failed", err));
