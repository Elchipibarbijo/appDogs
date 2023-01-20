const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      // type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max: {
      type: DataTypes.STRING,
    
      allowNull: false
    },
    life_span_min: { 
   type: DataTypes.STRING,
      
      allowNull: true
    },
    life_span_max: { 
      type: DataTypes.STRING,
         
         allowNull: true
       },
    weight_min:{
    type: DataTypes.STRING,
    
     allowNull: false,
    },
    weight_max:{
    type: DataTypes.STRING,
     
       allowNull: false,
    },
    image:{
      allowNull:false,
      type: DataTypes.STRING,
    },
    createInDb:{
     type: DataTypes.BOOLEAN,
     defaultValue: true,
     allowNull: false,
    }


    
  });
};
