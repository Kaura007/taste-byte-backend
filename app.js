import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import rootRouter from "./router/index.js";
import seedMenu from "./router/upload-menu.js";
import foodRoutes from "./router/foodRoutes.js";
import OrderEmbeddings from "./router/OrderEmbeddings.js";

dotenv.config();
const app = express();

app.use(express.json());

// Allow all GitHub Codespaces URLs + production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow GitHub Codespaces URLs and production
    if (
      origin.includes('.app.github.dev') || 
      origin === 'https://taste-byte-frontend.vercel.app' ||
      origin.startsWith('http://localhost')
    ) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api", rootRouter);
app.use("/api/data", seedMenu);
app.use("/api/food", foodRoutes);
app.use("/api/order", OrderEmbeddings);

const PORT = process.env.PORT || 5000;

// Use MongoDB URI from .env file
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ MongoDB Connected Successfully`);
      console.log(`✓ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✘ Database connection failed:", err.message);
    process.exit(1);
  });

export default app;
