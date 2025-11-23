import express from "express";
import FoodItem from "../models/FoodItem.js";
import axios from "axios";

const router = express.Router();

async function getEmbedding(text) {
  const res = await axios.post("http://127.0.0.1:8000/embed", { text });
  return res.data.embedding;
}

router.post("/upload-menu", async (req, res) => {
  try {
    const menuItems = [
      // ----- INTERNATIONAL FAMOUS DISHES -----

      // --- American ---
      {
        name: "Cheeseburger",
        description:
          "Classic American beef burger with cheese, lettuce, tomato, and pickles.",
        price: 12.99,
        image: "cheeseburger.jpg",
        category: "American",
        salesCount: 980,
      },
      {
        name: "Fried Chicken",
        description: "Crispy golden fried chicken with secret spices.",
        price: 11.49,
        image: "fried_chicken.jpg",
        category: "American",
        salesCount: 870,
      },
      {
        name: "BBQ Ribs",
        description: "Slow-cooked pork ribs glazed with smokey barbecue sauce.",
        price: 18.99,
        image: "bbq_ribs.jpg",
        category: "American",
        salesCount: 560,
      },

      // --- Italian ---
      {
        name: "Spaghetti Carbonara",
        description:
          "Creamy pasta with pecorino cheese, egg, and crispy bacon.",
        price: 15.49,
        image: "carbonara.jpg",
        category: "Italian",
        salesCount: 740,
      },
      {
        name: "Lasagna",
        description: "Layered pasta baked with cheese, meat sauce, and herbs.",
        price: 16.99,
        image: "lasagna.jpg",
        category: "Italian",
        salesCount: 690,
      },
      {
        name: "Fettuccine Alfredo",
        description:
          "Rich creamy Alfredo sauce tossed with fresh fettuccine pasta.",
        price: 14.99,
        image: "alfredo.jpg",
        category: "Italian",
        salesCount: 520,
      },

      // --- Chinese ---
      {
        name: "Kung Pao Chicken",
        description:
          "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
        price: 13.99,
        image: "kungpao_chicken.jpg",
        category: "Chinese",
        salesCount: 910,
      },
      {
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables and soy sauce.",
        price: 10.49,
        image: "hakka_noodles.jpg",
        category: "Chinese",
        salesCount: 1000,
      },
      {
        name: "Spring Rolls",
        description: "Crispy fried rolls stuffed with vegetables.",
        price: 6.99,
        image: "spring_rolls.jpg",
        category: "Chinese",
        salesCount: 830,
      },

      // --- Japanese ---
      {
        name: "Sushi Platter",
        description: "Assorted sushi rolls with salmon, tuna, and avocado.",
        price: 19.49,
        image: "sushi.jpg",
        category: "Japanese",
        salesCount: 590,
      },
      {
        name: "Ramen",
        description:
          "Japanese noodle soup with broth, soft-boiled egg, and sliced pork.",
        price: 14.49,
        image: "ramen.jpg",
        category: "Japanese",
        salesCount: 540,
      },
      {
        name: "Tempura",
        description: "Crispy battered prawns and vegetables.",
        price: 12.99,
        image: "tempura.jpg",
        category: "Japanese",
        salesCount: 440,
      },

      // --- Thai ---
      {
        name: "Pad Thai",
        description:
          "Stir-fried rice noodles with tofu, peanuts, and tamarind sauce.",
        price: 12.49,
        image: "pad_thai.jpg",
        category: "Thai",
        salesCount: 700,
      },
      {
        name: "Green Curry",
        description: "Spicy Thai green curry with coconut milk and vegetables.",
        price: 13.99,
        image: "green_curry.jpg",
        category: "Thai",
        salesCount: 510,
      },

      // --- Mexican ---
      {
        name: "Tacos",
        description:
          "Crispy or soft tortillas filled with chicken, salsa, and lettuce.",
        price: 9.99,
        image: "tacos.jpg",
        category: "Mexican",
        salesCount: 840,
      },
      {
        name: "Burrito",
        description:
          "Stuffed tortilla with rice, beans, salsa, cheese, and chicken.",
        price: 11.49,
        image: "burrito.jpg",
        category: "Mexican",
        salesCount: 760,
      },
      {
        name: "Nachos",
        description:
          "Crispy tortilla chips topped with cheese, beans, and jalapeños.",
        price: 10.49,
        image: "nachos.jpg",
        category: "Mexican",
        salesCount: 910,
      },

      // --- Middle Eastern ---
      {
        name: "Hummus with Pita",
        description: "Creamy chickpea dip served with warm pita bread.",
        price: 7.99,
        image: "hummus.jpg",
        category: "Middle Eastern",
        salesCount: 620,
      },
      {
        name: "Shawarma",
        description:
          "Juicy grilled chicken wrapped with garlic sauce and veggies.",
        price: 8.99,
        image: "shawarma.jpg",
        category: "Middle Eastern",
        salesCount: 780,
      },

      // --- Korean ---
      {
        name: "Kimchi Fried Rice",
        description: "Spicy fried rice prepared with kimchi and vegetables.",
        price: 11.99,
        image: "kimchi_fried_rice.jpg",
        category: "Korean",
        salesCount: 540,
      },
      {
        name: "Korean Fried Chicken",
        description: "Crispy chicken coated with sweet & spicy Korean sauce.",
        price: 14.99,
        image: "korean_fried_chicken.jpg",
        category: "Korean",
        salesCount: 670,
      },

      // ----- INTERNATIONAL PIZZAS -----
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, basil, and mozzarella.",
        price: 11.99,
        image: "margherita_pizza.jpg",
        category: "Pizza",
        salesCount: 1100,
      },
      {
        name: "Pepperoni Pizza",
        description: "Cheesy pizza topped with spicy pepperoni slices.",
        price: 14.49,
        image: "pepperoni_pizza.jpg",
        category: "Pizza",
        salesCount: 970,
      },
      {
        name: "BBQ Chicken Pizza",
        description: "Smoky BBQ chicken with onions, cheese, and herbs.",
        price: 15.99,
        image: "bbq_chicken_pizza.jpg",
        category: "Pizza",
        salesCount: 680,
      },
      {
        name: "Veggie Supreme Pizza",
        description:
          "Loaded with olives, onions, capsicum, tomatoes, and sweet corn.",
        price: 13.49,
        image: "veggie_supreme.jpg",
        category: "Pizza",
        salesCount: 820,
      },
      {
        name: "Four Cheese Pizza",
        description: "Mozzarella, parmesan, gorgonzola, and ricotta blend.",
        price: 16.49,
        image: "four_cheese.jpg",
        category: "Pizza",
        salesCount: 500,
      },

      // ----- COLD DRINKS -----
      {
        name: "Coca-Cola",
        description: "Classic carbonated soft drink.",
        price: 1.99,
        image: "coke.jpg",
        category: "Cold Drinks",
        salesCount: 1400,
      },
      {
        name: "Sprite",
        description: "Refreshing lemon-lime carbonated drink.",
        price: 1.99,
        image: "sprite.jpg",
        category: "Cold Drinks",
        salesCount: 1200,
      },
      {
        name: "Fanta",
        description: "Orange-flavored fizzy drink.",
        price: 1.99,
        image: "fanta.jpg",
        category: "Cold Drinks",
        salesCount: 1150,
      },
      {
        name: "Pepsi",
        description: "Popular cola drink with crisp taste.",
        price: 1.99,
        image: "pepsi.jpg",
        category: "Cold Drinks",
        salesCount: 1000,
      },
      {
        name: "Red Bull",
        description: "Energy drink that revitalizes body and mind.",
        price: 3.49,
        image: "redbull.jpg",
        category: "Cold Drinks",
        salesCount: 680,
      },
      {
        name: "Mountain Dew",
        description: "High-energy citrus-flavored soda.",
        price: 1.99,
        image: "mountain_dew.jpg",
        category: "Cold Drinks",
        salesCount: 900,
      },
    ];

    const inserted = [];

    for (const item of menuItems) {
      const text = `${item.name}. ${item.description}`;
      const embedding = await getEmbedding(text);

      const saved = await FoodItem.create({
        ...item,
        embedding,
      });

      inserted.push(saved);
    }

    res.json({
      success: true,
      count: inserted.length,
      items: inserted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
