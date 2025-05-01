const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedSubCategorys = require("./subcategory-seeds");
const seedProductSubCategorys = require("./product-subcategory-seeds");
const userData = require("./userData.json");
const {
  Product,
  Category,
  SubCategory,
  ProductSubCategory,
  User,
} = require("../modals");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  await seedSubCategorys();
  console.log("\n----- SUBCATEGORIES SEEDED -----\n");

  await seedProductSubCategorys();
  console.log("\n----- PRODUCT SUBCATEGORIES SEEDED -----\n");

  // const seedUsers =  await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  process.exit(0);
};

seedAll();
