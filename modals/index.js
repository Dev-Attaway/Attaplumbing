// Import models
const Product = require("../modals/product");
const Category = require("../modals/category");
const SubCategory = require("../modals/sub_category");
const ProductSubCategory = require("../modals/product_sub_category");
const User = require("../modals/user");
const Slides = require("../modals/slides");
const Posts = require("../modals/posts");
const Leads = require("./leads");

// Product Associations
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE", // Products are deleted if the associated category is deleted
});

// Category Associations
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// SubCategory Associations
Category.hasMany(SubCategory, {
  foreignKey: "category_id",
  as: "sub_categories", // Use this alias to fetch subcategories
});

SubCategory.belongsTo(Category, {
  foreignKey: "category_id",
});

// Many-to-Many Associations
Product.belongsToMany(SubCategory, {
  through: ProductSubCategory, // Defines the many-to-many relationship
  foreignKey: "product_id", // Foreign key in the ProductSubCategory model
});

SubCategory.belongsToMany(Product, {
  through: ProductSubCategory, // Defines the many-to-many relationship
  foreignKey: "sub_category_id", // Foreign key in the ProductSubCategory model
});

// Export models
module.exports = {
  Product,
  Category,
  SubCategory,
  ProductSubCategory,
  User,
  Slides,
  Posts,
  Leads, 
};
