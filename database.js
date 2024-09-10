import "dotenv/config";
import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected successfully!!");
    })
    .catch((e) => {
      console.log("Error while connecting to database", e);
    });
};
