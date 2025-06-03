const jwt = require("jsonwebtoken");

function setUser(user) {
      console.log(process.env.JWT_SECRET_KEY);

  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, process.env.JWT_SECRET_KEY);
}

function getUser(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
  setUser,
  getUser,
};
