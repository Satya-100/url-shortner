const { connect } = require("mongoose");

async function connectMongoDB(url) {
  try {
    return await connect(url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  connectMongoDB,
};
