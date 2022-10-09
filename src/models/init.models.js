const Roles = require('./role.model');
const Users = require('./user.model');
const Reservations = require('./reservation.model');
const Rooms = require('./room.model');

const initModels = () => {
  //Users <-Roles
  Roles.hasMany(Users);
  Users.belongsTo(Roles);
  //Users ->Reservations
  Users.hasMany(Reservations)
  Reservations.belongsTo(Users)
  //Rooms->Reservations
  Rooms.hasMany(Reservations)
  Reservations.belongsTo(Rooms)
}

module.exports = initModels;