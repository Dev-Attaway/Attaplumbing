const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "/assets/imgs/PlaceHolder.png",
    },
    activeUnit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableNames: true, //your table will be named products (all lowercase).
    underscored: true,
    modelName: "product",
  },
);

module.exports = Product;
