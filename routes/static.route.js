const { Router } = require("express");
const Url = require("../models/url.model");

const router = Router();

router.get("/", async (req, res) => {
  const allUrls = await Url.find({});

  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
