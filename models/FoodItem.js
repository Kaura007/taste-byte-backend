import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    salesCount: { type: Number, default: 0 },

    // STORED VECTOR EMBEDDING (768 dimensions)
    embedding: {
      type: [Number],
      default: [],
      index: "knnVector", // This is REQUIRED for Atlas vector search
      dimensions: 768,
      similarity: "cosine"
    },

    // Optional for “bought together” recommendations
    combos: [
      {
        itemId: mongoose.Schema.Types.ObjectId,
        count: Number
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodItemSchema);
