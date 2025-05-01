const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class SubCategory extends Model {}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment
    },
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure category_id is not null
      references: {
        model: "categories", // Matches the tableName in the Category model
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableNames: true,
    underscored: true,
    modelName: "sub_category",
  },
);

module.exports = SubCategory;
