const { Router } = require("express");
const {
  generaterShortUrl,
  getAnalytics,
} = require("../controllers/url.controller");
const router = Router();

router.post("/", generaterShortUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
