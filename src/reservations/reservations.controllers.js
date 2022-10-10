const uuid = require('uuid');
const Reservations = require('../models/reservation.model');
const Users = require('../models/user.model');
const Rooms = require('../models/room.model');

const getAllReservations = async () => {
  const response = await Reservations.findAll({

  })
  return response;
}

const getReservationById = async (id) => {
  const response = await Reservations.findOne({
    where: { id }
  })

  return response;
}

const createRervation = async (userId, roomId, data) => {
  const response = await Reservations.create({
    ...data,
    id: uuid.v4(),
    userId,
    roomId,
    state: 'pendiente'
  })

  return response;
}

const updateReservation = async (reservationId, data) => {

  const { id, userId, roomId, status, ...restOfData } = data;
  const response = await Reservations.update(
    { ...restOfData },
    { where: { id: reservationId } }
  )

  return response;
}

const deleteReservation = async (id) => {
  const state = { state: 'deleted' };

  const response = await Reservations.update(
    { ...state },
    { where: { id } }
  )

  return response;
}

const readMyReservations = (userId) => {
  const response = Reservations.findAll({
    where: { userId },
    attributes:{exclude:['userId']},
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['id', 'password', 'roleId', 'status', 'verified', 'createdAt', 'updatedAt']
        }
      },
      {
        model: Rooms,
        as: 'room',
        attributes: {
          exclude: ['id', 'isActive', 'createdAt', 'updatedAt']
        }
      }
    ]
  })

  return response;
}

const readMyReservation = (userId, reservationId) => {
  const response = Reservations.findOne({
    where: { userId },
    attributes:{exclude:['userId']},
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['id', 'password', 'roleId', 'status', 'verified', 'createdAt', 'updatedAt']
        }
      },
      {
        model: Rooms,
        as: 'room',
        attributes: {
          exclude: ['id', 'isActive', 'createdAt', 'updatedAt']
        }
      }
    ]
  })

  return response;
}

const updateMyReservation = (userID, reservationId, data) => {
  const { id, userId, roomId, state, ...restOfData } = data;
  const response = Reservations.findOne(
    { ...restOfData },
    { where: { userId: userID, id: reservationId } }
  )

  return response;
}

const deleteMyReservation = (userId, reservationId) => {
  const state = { state: 'deleted' };

  const response = Reservations.update(
    { ...state },
    { where: { userId, id: reservationId } }
  )

  return response;
}

module.exports = {
  getAllReservations,
  getReservationById,
  createRervation,
  updateReservation,
  deleteReservation,
  readMyReservations,
  readMyReservation,
  updateMyReservation,
  deleteMyReservation
}

