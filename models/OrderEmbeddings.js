import mongoose from "mongoose";

const orderEmbeddingSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
      }
    ],
    embedding: {
      type: [Number], // 768-dim vector
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderEmbedding", orderEmbeddingSchema);
