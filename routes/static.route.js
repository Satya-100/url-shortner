const { Router } = require("express");
const Url = require("../models/url.model");
const { restrictTo } = require("../middlewares/auth");

const router = Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("admin/urls", {
    urls: allUrls,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await Url.find({ createdBy: req.user._id });

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
