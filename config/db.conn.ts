import mongoose from "mongoose";
import MONGO_DB_CONFIG from "./app.config";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(MONGO_DB_CONFIG.DB);
    console.log("Db is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
