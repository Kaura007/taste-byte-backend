import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

router.use("/users", userRoutes);

export default router;
