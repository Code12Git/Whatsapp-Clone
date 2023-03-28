import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
const URI = process.env.MONGO_URI;
const connection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: "majority" },
    });
    console.log("Database connected Successfully!");
    return mongoose.connection;
  } catch (error) {
    console.log("Error while connecting", error.message);
    throw error;
  }
};

export default connection;
