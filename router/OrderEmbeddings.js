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

    // 1️⃣ Fetch embeddings of all ordered items
    const foodItems = await FoodItem.find({ _id: { $in: items } });

    if (foodItems.length === 0)
      return res.status(404).json({ error: "No items found" });

    const itemEmbeddings = foodItems.map((item) => item.embedding);

    // 2️⃣ Compute mean embedding vector
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

    // 3️⃣ Store in DB
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

// Recommend items based on past learned combo embeddings
router.get("/recommend", async (req, res) => {
  try {
    const { itemId } = req.query;

    if (!itemId) return res.status(400).json({ error: "itemId is required" });

    // 1️⃣ Get the selected item
    const item = await FoodItem.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const itemEmbedding = item.embedding;

    // 2️⃣ Vector search: find similar past orders
    const matches = await OrderEmbedding.aggregate([
      {
        $vectorSearch: {
          index: "order_vector_index",
          path: "embedding",
          queryVector: itemEmbedding,
          numCandidates: 100,
          limit: 20,
        }
      }
    ]);

    // 3️⃣ Count frequent co-occurring items
    const counts = {};

    matches.forEach((order) => {
      order.items.forEach((id) => {
        if (id.toString() !== itemId) {
          counts[id] = (counts[id] || 0) + 1;
        }
      });
    });

    // Sort by frequency
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    // Get final item details
    const recommended = await FoodItem.find({
      _id: { $in: sorted.map(([id]) => id) },
    });

    res.json({
      success: true,
      recommendedItems: recommended,
    });

  } catch (err) {
    console.error("Combo recommend error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
