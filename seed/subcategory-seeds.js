const { SubCategory } = require("../modals");

const subCategoryData = [
  /*Shirts Fabric types */
  {
    subCategoryName: "Linen", // subCategoryData_id = 1
    category_id: 1,
  },

  /*Shorts Fabric types */
  {
    subCategoryName: "Denim", // subCategoryData_id = 2
    category_id: 2,
  },

  /* Music */
  {
    subCategoryName: "rock music", // subCategoryData_id = 3
    category_id: 3,
  },
  {
    subCategoryName: "pop music", // subCategoryData_id = 4
    category_id: 3,
  },
  {
    subCategoryName: "pop culture", // subCategoryData_id = 5
    category_id: 3,
  },

  /* Hats Colors */
  {
    subCategoryName: "blue", // subCategoryData_id = 6
    category_id: 4,
  },
  {
    subCategoryName: "red", // subCategoryData_id = 7
    category_id: 4,
  },
  {
    subCategoryName: "green", // subCategoryData_id = 8
    category_id: 4,
  },
  {
    subCategoryName: "white", // subCategoryData_id = 9
    category_id: 4,
  },
  {
    subCategoryName: "gold", // subCategoryData_id = 10
    category_id: 4,
  },
  {
    subCategoryName: "pop culture", // subCategoryData_id = 11
    category_id: 4,
  },

  /* Shoes */
  {
    subCategoryName: "blue", // subCategoryData_id = 12
    category_id: 5,
  },
  {
    subCategoryName: "pop culture", // subCategoryData_id = 13
    category_id: 5,
  },
];

const seedSubCategorys = () => SubCategory.bulkCreate(subCategoryData);

module.exports = seedSubCategorys;
