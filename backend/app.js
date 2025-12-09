import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./dbConnect.js";
import errorMiddleware from "./middlewares/error.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err);
  console.log(err.stack);
  process.exit(1);
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./backend/.env" });
}
console.log("Loaded .env, NODE_ENV =", process.env.NODE_ENV);
connectDB();
console.log("connectDB called");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins =
  process.env.NODE_ENV === "PRODUCTION"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.set("etag", false);
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.set("Cache-Control", "no-store");
  }
  next();
});

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("query parser", "extended");

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send("Grocerly API is running. Try /api/products");
});
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(
    `The server is running at ${PORT} in ${process.env.NODE_ENV} mode `
  );
});

//handle Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
