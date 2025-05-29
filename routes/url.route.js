const { Router } = require("express");
const { generaterShortUrl } = require("../controllers/url.controller");
const router = Router();

router.post("/", generaterShortUrl);

module.exports = router;
