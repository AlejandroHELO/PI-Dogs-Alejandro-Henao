const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
        name : {
            type: DataTypes.STRING,
            unique: true
        }
    }, { 
        timestamps: false
        // timestamps: true,
        // createdAt: false,
        // updatedAt: 'actualizado'
  })
}