const { Category } = require("../modals");

const categoryData = [
  { categoryName: "Shirts" }, // category_id 1
  { categoryName: "Shorts" }, // category_id 2
  { categoryName: "Music" }, // category_id 3
  { categoryName: "Hats" }, // category_id 4
  { categoryName: "Shoes" }, // category_id 5
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
