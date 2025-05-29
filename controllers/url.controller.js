const { nanoid } = require("nanoid");
const Url = require("../models/url.model");

async function generaterShortUrl(req, res) {
  if (!req.body.redirectUrl) {
    return res.status(404).json({ message: "URL is required" });
  }

  const shortID = nanoid(6);

  await Url.create({
    shortId: shortID,
    redirectUrl: req.body.redirectUrl,
    visitHistory: [],
  });

  return res.status(201).json({ message: "ShortId generated", shortID });
}

module.exports = {
  generaterShortUrl,
};
