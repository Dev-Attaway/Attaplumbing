const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

class Slides extends Model {};


Slides.init(
    {
        slideId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        slideURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slideAlt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slideorder:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableNames: true,
        underscored: true,
        modelName: 'Slides',
    }
)

module.exports = Slides;