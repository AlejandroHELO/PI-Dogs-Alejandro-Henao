const { DataTypes, UUIDV4} = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperament', {
        id : {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        name : {
            type: DataTypes.STRING
        }
    }, { 
        timestamps: false
        // timestamps: true,
        // createdAt: false,
        // updatedAt: 'actualizado'
  })
}