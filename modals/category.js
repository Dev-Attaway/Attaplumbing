const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "categories", // Correct table name
    freezeTableNames: true,
    underscored: true,
    modelName: "category", // Matches the association model name
  },
);

module.exports = Category;
