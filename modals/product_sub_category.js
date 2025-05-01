const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductSubCategory extends Model {}

ProductSubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "sub_category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_sub_category",
  },
);

module.exports = ProductSubCategory;
