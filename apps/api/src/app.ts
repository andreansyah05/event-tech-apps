import express from "express";
import featureRouter from "./routers/feature.router";
import environment from "dotenv";
import adminRouter from "./routers/admin.routers/admin.router";
import userRouter from "./routers/user.routers/user.router";

environment.config();

const app = express();
const PORT = process.env.SERVER_PORT_DEV;

app.use(express.json());

// jalur utama dari api
app.get("/api", featureRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
