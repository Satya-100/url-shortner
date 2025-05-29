const express = require("express");
const urlRoute = require("./routes/url.route");
const { connectMongoDB } = require("./config/connection");
const Url = require("./models/url.model");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// database connection
connectMongoDB(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
