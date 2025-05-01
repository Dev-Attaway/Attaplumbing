const { ProductSubCategory } = require("../modals");

const productSubCategoryData = [
  {
    product_id: 1,
    sub_category_id: 2, // pop music
  },
  {
    product_id: 1,
    sub_category_id: 7, // red
  },
  {
    product_id: 2,
    sub_category_id: 6, // blue
  },
  {
    product_id: 3,
    sub_category_id: 3, // rock music
  },
  {
    product_id: 4,
    sub_category_id: 8, // green
  },
  {
    product_id: 4,
    sub_category_id: 5, // pop culture
  },
  {
    product_id: 5,
    sub_category_id: 5, // pop culture
  },
  {
    product_id: 5,
    sub_category_id: 6, // blue
  },
];

const seedProductSubCategorys = () =>
  ProductSubCategory.bulkCreate(productSubCategoryData);

module.exports = seedProductSubCategorys;
