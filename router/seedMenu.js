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
      // ----- MAIN COURSE (NORTH INDIAN) -----
      {
        name: "Paneer Butter Masala",
        description:
          "Creamy tomato-based gravy with soft paneer cubes and aromatic spices.",
        price: 220,
        image: "paneer_butter_masala.jpg",
        category: "Main Course",
        salesCount: 532,
      },
      {
        name: "Shahi Paneer",
        description:
          "Rich and creamy gravy made with cashews, tomatoes, and spices.",
        price: 250,
        image: "shahi_paneer.jpg",
        category: "Main Course",
        salesCount: 480,
      },
      {
        name: "Kadhai Paneer",
        description: "Paneer cooked with capsicum, onions, and Indian spices.",
        price: 230,
        image: "kadhai_paneer.jpg",
        category: "Main Course",
        salesCount: 350,
      },
      {
        name: "Dal Makhani",
        description:
          "Slow-cooked black lentils simmered overnight with butter and cream.",
        price: 160,
        image: "dal_makhani.jpg",
        category: "Main Course",
        salesCount: 670,
      },
      {
        name: "Rajma Chawal",
        description:
          "Classic Punjabi-style kidney bean curry served with steamed rice.",
        price: 140,
        image: "rajma_chawal.jpg",
        category: "Main Course",
        salesCount: 450,
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpeas served with deep-fried, fluffy bhature.",
        price: 150,
        image: "chole_bhature.jpg",
        category: "Main Course",
        salesCount: 610,
      },
      {
        name: "Butter Chicken",
        description: "Tender chicken cooked in creamy tomato gravy and butter.",
        price: 280,
        image: "butter_chicken.jpg",
        category: "Main Course",
        salesCount: 780,
      },
      {
        name: "Chicken Tikka Masala",
        description: "Marinated chicken cooked in a spicy, tangy gravy.",
        price: 260,
        image: "chicken_tikka_masala.jpg",
        category: "Main Course",
        salesCount: 500,
      },
      {
        name: "Mutton Rogan Josh",
        description: "Kashmiri-style mutton curry with yogurt and spices.",
        price: 380,
        image: "rogan_josh.jpg",
        category: "Main Course",
        salesCount: 370,
      },
      {
        name: "Egg Curry",
        description: "Boiled eggs cooked in spicy onion-tomato gravy.",
        price: 130,
        image: "egg_curry.jpg",
        category: "Main Course",
        salesCount: 290,
      },

      // ----- RICE & BIRYANI -----
      {
        name: "Veg Biryani",
        description:
          "Fragrant basmati rice cooked with vegetables and mild spices.",
        price: 180,
        image: "veg_biryani.jpg",
        category: "Rice",
        salesCount: 420,
      },
      {
        name: "Chicken Biryani",
        description:
          "Hyderabadi-style biryani layered with marinated chicken and saffron.",
        price: 280,
        image: "chicken_biryani.jpg",
        category: "Rice",
        salesCount: 715,
      },
      {
        name: "Mutton Biryani",
        description:
          "Rich and aromatic biryani made with tender mutton pieces.",
        price: 350,
        image: "mutton_biryani.jpg",
        category: "Rice",
        salesCount: 500,
      },
      {
        name: "Jeera Rice",
        description: "Steamed basmati rice tempered with cumin seeds.",
        price: 90,
        image: "jeera_rice.jpg",
        category: "Rice",
        salesCount: 290,
      },
      {
        name: "Veg Pulao",
        description: "Rice cooked with mixed vegetables, onions, and spices.",
        price: 110,
        image: "veg_pulao.jpg",
        category: "Rice",
        salesCount: 240,
      },

      // ----- BREADS -----
      {
        name: "Butter Naan",
        description: "Soft tandoori naan brushed generously with butter.",
        price: 40,
        image: "butter_naan.jpg",
        category: "Breads",
        salesCount: 910,
      },
      {
        name: "Garlic Naan",
        description: "Tandoori naan topped with garlic and coriander.",
        price: 55,
        image: "garlic_naan.jpg",
        category: "Breads",
        salesCount: 560,
      },
      {
        name: "Tandoori Roti",
        description: "Whole wheat roti cooked in clay oven.",
        price: 20,
        image: "tandoori_roti.jpg",
        category: "Breads",
        salesCount: 780,
      },
      {
        name: "Lachha Paratha",
        description: "Multi-layered paratha cooked with ghee.",
        price: 45,
        image: "lachha_paratha.jpg",
        category: "Breads",
        salesCount: 330,
      },

      // ----- SOUTH INDIAN -----
      {
        name: "Masala Dosa",
        description: "Crispy dosa filled with spiced potato masala.",
        price: 120,
        image: "masala_dosa.jpg",
        category: "South Indian",
        salesCount: 420,
      },
      {
        name: "Idli Sambar",
        description: "Soft idlis served with sambar and coconut chutney.",
        price: 80,
        image: "idli_sambar.jpg",
        category: "South Indian",
        salesCount: 350,
      },
      {
        name: "Medu Vada",
        description: "Crispy lentil vadas served with chutney.",
        price: 70,
        image: "medu_vada.jpg",
        category: "South Indian",
        salesCount: 280,
      },
      {
        name: "Rava Dosa",
        description: "Semolina-based crispy dosa with spices.",
        price: 130,
        image: "rava_dosa.jpg",
        category: "South Indian",
        salesCount: 210,
      },
      {
        name: "Uttapam",
        description: "Thick dosa topped with onions and tomatoes.",
        price: 95,
        image: "uttapam.jpg",
        category: "South Indian",
        salesCount: 190,
      },

      // ----- SNACKS & CHAAT -----
      {
        name: "Pani Puri",
        description:
          "Crispy puris filled with tangy mint water and potato mixture.",
        price: 50,
        image: "pani_puri.jpg",
        category: "Snacks",
        salesCount: 640,
      },
      {
        name: "Aloo Tikki",
        description: "Fried potato patties served with chutneys.",
        price: 60,
        image: "aloo_tikki.jpg",
        category: "Snacks",
        salesCount: 350,
      },
      {
        name: "Dahi Puri",
        description: "Crispy puris topped with yogurt, chutneys, and spices.",
        price: 75,
        image: "dahi_puri.jpg",
        category: "Snacks",
        salesCount: 320,
      },
      {
        name: "Samosa",
        description: "Crispy fried pastry filled with spiced potatoes.",
        price: 20,
        image: "samosa.jpg",
        category: "Snacks",
        salesCount: 900,
      },
      {
        name: "Kachori",
        description: "Spicy lentil-filled crispy kachori.",
        price: 30,
        image: "kachori.jpg",
        category: "Snacks",
        salesCount: 280,
      },

      // ----- TANDOORI & STARTERS -----
      {
        name: "Paneer Tikka",
        description: "Marinated paneer cubes roasted in tandoor.",
        price: 180,
        image: "paneer_tikka.jpg",
        category: "Starters",
        salesCount: 460,
      },
      {
        name: "Chicken Tandoori",
        description:
          "Classic red tandoori chicken marinated in yogurt and spices.",
        price: 320,
        image: "chicken_tandoori.jpg",
        category: "Starters",
        salesCount: 510,
      },
      {
        name: "Veg Manchurian",
        description: "Crispy vegetable balls tossed in Indo-Chinese sauce.",
        price: 150,
        image: "veg_manchurian.jpg",
        category: "Starters",
        salesCount: 430,
      },
      {
        name: "Chicken 65",
        description: "Spicy South Indian-style fried chicken.",
        price: 220,
        image: "chicken_65.jpg",
        category: "Starters",
        salesCount: 390,
      },
      {
        name: "Hara Bhara Kebab",
        description: "Healthy spinach and green pea patties.",
        price: 140,
        image: "hara_bhara_kebab.jpg",
        category: "Starters",
        salesCount: 310,
      },

      // ----- DESSERTS -----
      {
        name: "Gulab Jamun",
        description: "Soft khoya balls soaked in warm syrup.",
        price: 60,
        image: "gulab_jamun.jpg",
        category: "Dessert",
        salesCount: 370,
      },
      {
        name: "Rasgulla",
        description: "Soft and spongy chhena balls soaked in sugar syrup.",
        price: 65,
        image: "rasgulla.jpg",
        category: "Dessert",
        salesCount: 310,
      },
      {
        name: "Jalebi",
        description: "Crispy bright orange jalebis dipped in syrup.",
        price: 40,
        image: "jalebi.jpg",
        category: "Dessert",
        salesCount: 520,
      },
      {
        name: "Kheer",
        description: "Traditional rice pudding made with milk and cardamom.",
        price: 70,
        image: "kheer.jpg",
        category: "Dessert",
        salesCount: 260,
      },
      {
        name: "Rabri",
        description: "Thick sweetened milk dessert flavored with saffron.",
        price: 120,
        image: "rabri.jpg",
        category: "Dessert",
        salesCount: 230,
      },

      // ----- BEVERAGES -----
      {
        name: "Masala Chai",
        description: "Strong Indian tea brewed with spices.",
        price: 20,
        image: "masala_chai.jpg",
        category: "Beverages",
        salesCount: 680,
      },
      {
        name: "Cold Coffee",
        description: "Iced creamy coffee topped with vanilla.",
        price: 90,
        image: "cold_coffee.jpg",
        category: "Beverages",
        salesCount: 310,
      },
      {
        name: "Lassi",
        description: "Refreshing yogurt drink available in sweet or salty.",
        price: 50,
        image: "lassi.jpg",
        category: "Beverages",
        salesCount: 350,
      },
      {
        name: "Lemon Soda",
        description: "Fresh soda with lemon, salt, and sugar.",
        price: 40,
        image: "lemon_soda.jpg",
        category: "Beverages",
        salesCount: 220,
      },
      {
        name: "Coconut Water",
        description: "Fresh tender coconut water served chilled.",
        price: 60,
        image: "coconut_water.jpg",
        category: "Beverages",
        salesCount: 200,
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
