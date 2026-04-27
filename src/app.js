const express = require("express");

const app = express();

app.use("/", (err, res, req, next) => {
  console.log("Nothing error 2")
  if(err){
    res.status(500).send("Somthing went ")
  }
})


app.get("/user", (req, res) => {
 try{
    console.log("Nothing error")
    throw new error("error somying")
    res.send("User data sent")
  }
  catch(err){
    res.status(500).send("Somthing went wrong, contact support team")
  }
})


app.listen(7777, () => {
  console.log("Server running on port 7777");
});

  