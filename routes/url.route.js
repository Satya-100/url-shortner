const { Router } = require("express");
const {
  generaterShortUrl,
  getAnalytics,
  handleRedirectUrl,
} = require("../controllers/url.controller");
const router = Router();

router.post("/", generaterShortUrl);
router.get("/analytics/:shortId", getAnalytics);
router.get("/:shortId", handleRedirectUrl);

module.exports = router;
