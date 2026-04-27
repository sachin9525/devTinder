const adminAuth = (req, res, next) => {
  const token = "xyza";
  const isAdminAuthorized = token === "xyz"
  if(!isAdminAuthorized){
    res.status(401).send("Unauthorized Admin")
  }else{
    next()
  }
}

const userAuth = (req, res, next) => {
  const userId = "abc";
  const isUserIdAuthorized = userId === "abc";
  if(!isUserIdAuthorized){
    res.status(401).send("Unauthorized User Id")
  }else{
    next()
  }
}

module.exports = {
  adminAuth,
  userAuth
}