const express = require("express");
const { connectMongoDB } = require("./config/connection");
const Url = require("./models/url.model");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUsersOnly } = require("./middlewares/auth");

// routes
const urlRoute = require("./routes/url.route");
const staticRoute = require("./routes/static.route");
const userRoute = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 8000;

// database connection
connectMongoDB(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/url", restrictToLoggedInUsersOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
