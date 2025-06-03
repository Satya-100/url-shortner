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

  return res.render("home", {
    shortId: shortID,
  })
  // return res.status(201).json({ message: "ShortId generated", shortID });
}

async function getAnalytics(req, res) {
  const url = await Url.findOne({ shortId: req.params.shortId });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.status(200).json({
    redirectUrl: url.redirectUrl,
    noOfClicks: url.visitHistory.length,
    visitHistory: url.visitHistory,
  });
}

async function handleRedirectUrl(req, res) {
  const url = await Url.findOneAndUpdate(
    { shortId: req.params.shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.status(200).redirect(url.redirectUrl);
}

module.exports = {
  generaterShortUrl,
  getAnalytics,
  handleRedirectUrl,
};
