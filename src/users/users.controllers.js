const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');
const Users = require('../models/user.model');

const getAllUsers = async () => {

  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  });
  return data;
}

const getUserById = async (id) => {
  const data = await Users.findOne({
    where: { id: id },
    attributes: {
      exclude: ['password']
    }
  })

  return data;
}
const createUser = async (data) => {
  const newUser = await Users.create({
    ...data,
    id: uuid.v4(),
    password: hashPassword(data.password),
    roleId: 'fef3a08d-2cec-4728-9745-7cbd2b37e557',
    status: 'active',
    verified: false,
  })

  return newUser;
}

const updateUser = async (userId, data) => {
  const { id, password, verified, ...restOfData } = data;

  const response = Users.update(
    { ...restOfData },
    { where: { id: userId } }
  )

  return response;
}

const deleteUser = async (id) => {
  const deleted = { status: 'deleted' }

  const response = await Users.update(
    { ...deleted },
    { where: { id: id } }
  )

  return response;
}

const updateMyUser = async (userId, data) => {
  const { id, password, roleId, status, verified, createdAt, updatedAt, ...restOfData } = data;

  const response = await Users.update(
    { ...restOfData },
    { where: { id: userId } }
  )

  return response;
}



const getUserByEmail = async (email) => {
  const response =await Users.findOne({
     where: { email },
     attributes:{
      exclude:['createdAt','updatedAt']
     }
  });
  return response;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateMyUser,
  getUserByEmail
}
