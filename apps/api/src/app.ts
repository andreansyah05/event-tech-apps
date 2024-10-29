import express from "express";
import featureRouter from "./routers/feature.router";
import environment from "dotenv";
import authRouter from "./routers/user.routers/auth.router";
import referralRouter from "./routers/user.routers/referral.router";
import cors from "cors";

environment.config();

const app = express();
const PORT = process.env.DEV_SERVER_PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// jalur utama dari api
app.get("/api", featureRouter);
app.use("/api/auth", authRouter);
app.use("/api/referral", referralRouter);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
