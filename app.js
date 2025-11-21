import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import rootRouter from "./router/index.js";
import seedMenu from "./router/seedMenu.js";
import foodRoutes from "./router/foodRoutes.js";
import OrderEmbeddings from "./router/OrderEmbeddings.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);
app.use("/api/data", seedMenu);
app.use("/api/food", foodRoutes);
app.use("/api/order", OrderEmbeddings);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
