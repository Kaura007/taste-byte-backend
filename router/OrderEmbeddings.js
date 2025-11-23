import express from "express";
import FoodItem from "../models/FoodItem.js";
import OrderEmbedding from "../models/OrderEmbeddings.js";

const router = express.Router();

router.post("/train", async (req, res) => {
  try {
    const { items } = req.body; // array of item IDs

    if (!items || items.length < 1) {
      return res.status(400).json({ error: "Order must have at least 1 item" });
    }

    // Fetch embeddings of all ordered items
    const foodItems = await FoodItem.find({ _id: { $in: items } });

    if (foodItems.length === 0)
      return res.status(404).json({ error: "No items found" });

    const itemEmbeddings = foodItems.map((item) => item.embedding);

    // Compute mean embedding vector
    const dims = itemEmbeddings[0].length;

    const orderEmbedding = Array(dims).fill(0);

    // Sum all embeddings
    itemEmbeddings.forEach((vec) => {
      vec.forEach((v, i) => {
        orderEmbedding[i] += v;
      });
    });

    // Divide by # items → average
    for (let i = 0; i < dims; i++) {
      orderEmbedding[i] /= itemEmbeddings.length;
    }

    // Store in DB
    const saved = await OrderEmbedding.create({
      items,
      embedding: orderEmbedding,
    });

    res.json({
      success: true,
      message: "Order embedding stored successfully",
      order: saved,
    });

  } catch (err) {
    console.error("Order embedding error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
