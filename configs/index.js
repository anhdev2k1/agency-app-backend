import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB successfully!!");
  });
}

export default main;
