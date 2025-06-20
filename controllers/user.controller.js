const User = require("../models/user.model");
const { setUser } = require("../service/auth");

async function userSignup(req, res) {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(404).json({ message: "All input is required" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //   return res.status(201).json({ message: "User created successfully", user });
  return res.redirect("/");
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const token = setUser(user);
  res.cookie("token", token);

  return res.redirect("/");
  // return res.json({ token });
}

module.exports = {
  userSignup,
  userLogin,
};
