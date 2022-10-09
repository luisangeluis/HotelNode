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
    where: {
      id: id
    },
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

const editUser = async (userId, data, userRol) => {

  if (userRol === 'admin') {
    const { id, password, verified, ...newData } = data;
    const response = Users.update({
      ...newData
    }, {
      where: {
        id: userId
      }
    });

    return response;
  } else {
    const { id, password, verified, role, ...newData } = data;
    const response = Users.update({
      //Valores que quiero actualizar
      ...newData
    }, {
      where: {
        id: userId
      }
    });

    return response;
  }
}

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })

  return data;

}

const getUserByEmail = async (email) => {
  const response = await Users.findOne({ where: { email } });
  return response;
  // const data = userDB.filter(item => item.email === email);
  // return data.length > 0 ? data[0] : false;
}

const editProfileImg = async (userId, imgUrl) => {

  const response = await Users.update({
    profileImage: imgUrl
  }, {
    where: {
      id: userId
    }
  })

  return response;

  // const index = userDB.findIndex(user => user.id === userId);

  // if (index !== -1) {
  //   userDB[index].profile_image = imgUrl;
  //   return userDB[index];
  // }

  // return false;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}
