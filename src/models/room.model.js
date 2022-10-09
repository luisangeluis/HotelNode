const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Rooms = db.define('rooms', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  beds: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bathrooms: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true,
    field:'is_active'
  }
})

module.exports = Rooms;
