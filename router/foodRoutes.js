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

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json({ success: true, results: [] });
    }

    // 1️⃣ Semantic query → embedding
    const embedding = await getEmbedding(query);

    // 2️⃣ KEYWORD MATCH
    const keywordResults = await FoodItem.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    // 3️⃣ SEMANTIC MATCH
    const semanticResults = await FoodItem.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 50,
          limit: 10
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          image: 1,
          category: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]);

    const combinedMap = new Map();

    // Add keyword results with 30% base score
    keywordResults.forEach((item) => {
      combinedMap.set(item._id.toString(), {
        item,
        score: 0.3
      });
    });

    // Add semantic results with weighted score
    semanticResults.forEach((s) => {
      const id = s._id.toString();
      const semanticScore = s.score;

      if (combinedMap.has(id)) {
        combinedMap.get(id).score += 0.5 * semanticScore;
      } else {
        combinedMap.set(id, {
          item: s,
          score: 0.7 * semanticScore
        });
      }
    });

    // Convert → sort → take only top 3
    const finalResults = Array.from(combinedMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)                // 🔥 Only Top 3 here
      .map((x) => x.item);

    res.json({
      success: true,
      results: finalResults
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
