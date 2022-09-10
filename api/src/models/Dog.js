const { DataTypes, UUIDV4 } = require('sequelize');
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
      type: DataTypes.STRING,
      allowNull : false
    },
    weight : {
      type: DataTypes.STRING,
      allowNull : false
    },
    breedGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lifeSpan : {
      type: DataTypes.STRING,
    },
    temperament : {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creadoEnDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      valdiate: {
        notNull: true,
      }
    }
  }, {
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};
