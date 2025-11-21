import express from "express";
import FoodItem from "../models/FoodItem.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const items = await FoodItem.find({}).sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
