const express = require("express");
const router = express.Router();
const { Op, where } = require("sequelize");
const {
  Message,
  Product,
  Category,
  SubCategory,
  ProductSubCategory,
  User,
} = require("../modals");

// const scrape1688Products = require("../public/assets/js/scrape1688.js"); // adjust path


// router.get("/search", async (req, res) => {
//   console.log("🧪 Hitting /search route with query:", req.query.q);

//   const query = req.query.q;
//   if (!query) return res.status(400).send("Missing search term");

//   try {
//     const products = await scrape1688Products(query);
// console.log("✅ Received products:", products.length);

    
//     res.render("shopPage", { products, query });
//   } catch (err) {
//     res.status(500).send("Error scraping 1688.");
//   }
// });

//Comment to help with commit
module.exports = router;
