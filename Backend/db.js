import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB started");
    })
    .catch((error) => console.log("Error connecting to DB", error));
};

