const { DataTypes } = require('sequelize');
const { validate } = require('uuid');
const { db } = require('../utils/database');
//Models
const Roles = require('./role.model');

const Users = db.define('users', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  
  roleId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'role_id',
    references: {
      model: Roles,
      key: 'id'
    }
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active' //active,deleted, suspended
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  }

});

module.exports = Users;

