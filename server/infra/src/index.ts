import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import hackathonRouter from "./routes/hackathon";
import dotenv from "dotenv";
// import { handleCors } from "./middlewares/cors";
import cors from "cors";
dotenv.config();

const app = express();

const port = process.env.PORT;

// app.use(handleCors);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use("/api/infra/user", userRouter);
app.use("/api/infra/hackathon", hackathonRouter);

const uri: any = process.env.DB_CONNECTION_URI;
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options, () =>
  console.log("connected to database successfully.")
);

app.listen(port, () => console.log(`Started server on port ${port}`));
