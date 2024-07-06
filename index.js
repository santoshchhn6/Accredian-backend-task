import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import referralRoute from "./Routes/ReferralRoute.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());

app.use("/referral", referralRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
