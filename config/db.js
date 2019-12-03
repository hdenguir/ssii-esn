const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoURI");

console.log("============db===============");
console.log(db);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected ....");
  } catch (err) {
    console.log("========= MongoDB Disconnected ....======");
    console.log(err.message);
    return {
      errors: [{ msg: err.message }]
    };
    //process.exit(1);
  }
};

module.exports = connectDB;
