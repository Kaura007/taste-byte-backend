import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,

    // ✨ User taste profile (same dimension as item embeddings)
    profileEmbedding: {
      type: [Number],
      default: []
    },

    recentItems: [mongoose.Schema.Types.ObjectId], // last 10–20 items
    pastOrders: [
      {
        itemId: mongoose.Schema.Types.ObjectId,
        date: Date
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
