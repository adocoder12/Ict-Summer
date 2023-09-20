require("dotenv").config();
const mongoose = require("mongoose");

const stringMongoose = `${process.env.MONGOOSE_URI}/ict_summer`;

// Connect to DB

async function connect() {
  try {
    await mongoose.connect(stringMongoose, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
