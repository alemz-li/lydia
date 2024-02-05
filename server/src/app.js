import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import biteRoutes from "./routes/bite.routes.js";
import { CORS_OPTIONS } from "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use("/api/auth", authRoutes);
app.use("/api/bites", biteRoutes);

export default app;
