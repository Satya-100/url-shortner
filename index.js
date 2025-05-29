const express = require("express");
const urlRoute = require("./routes/url.route");
const { connectMongoDB } = require("./config/connection");
require('dotenv').config()

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

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
