import express from "express";
import "dotenv/config";
import { connectDatabase } from "./database.js";
import authRouter from "./Route/authRoute.js";

const PORT = process.env.PORT_NUMBER || 4000;

const app = express();
app.use(express.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Hello From Express JS!!");
});

app.listen(PORT, () => {
  connectDatabase();
  console.log("Server Started Successfully!!");
});
