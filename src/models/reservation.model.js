const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Users =require('./user.model');
const Rooms = require('./room.model');

const Reservations = db.define('reservations', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: Users,
      key: 'id'
    }
  },
  arrival:{
    type:DataTypes.DATE,
    allowNull:false
  },
  departure:{
    type:DataTypes.DATE,
    allowNull:false
  },
  roomId:{
    type:DataTypes.UUID,
    allowNull:false,
    field:"room_id",
    references: {
      model: Rooms,
      key: 'id'
    }
  },
  adults:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  kids:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  babies:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  pets:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'pendiente'
  }
})

module.exports = Reservations;
