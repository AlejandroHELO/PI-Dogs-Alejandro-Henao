const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego el parametro será la conexion a sequelize realizada en db
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id : {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull : false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height : {
      type: DataTypes.JSON,
      allowNull : false
    },
    weight : {
      type: DataTypes.JSON,
      allowNull : false
    },
    life_span : {
      type: DataTypes.STRING,
    }
  }, {
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};
