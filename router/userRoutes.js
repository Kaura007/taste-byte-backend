import express from "express";
import FoodItem from "../models/FoodItem.js";
import axios from "axios";

const router = express.Router();
async function getEmbedding(text) {
  const res = await axios.post("http://127.0.0.1:8000/embed", { text });
  return res.data.embedding;
}

router.get("/", (req, res) => {
  res.json({ message: "User route working!" });
});


export default router;
