const {getUserByEmail} =require('../users/users.controllers');
const { comparePassword } = require('../utils/crypt');
// const {} =require('');

const loginUser = async(email, password) => {
  try {
    const user =await getUserByEmail(email);
    // console.log('el user',user);
    const verifyPassword = comparePassword(password, user.password);
    
    if (verifyPassword) {
      return user;
    }
    return false;

  } catch (error) {
    return false;
  }
}

module.exports={
  loginUser
}