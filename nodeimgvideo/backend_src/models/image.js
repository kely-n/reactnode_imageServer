
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false,  primaryKey: true},
        location: { type: DataTypes.STRING, allowNull: false },
    };


    return sequelize.define('image', attributes,
    {
        timestamps: false
    });
}

