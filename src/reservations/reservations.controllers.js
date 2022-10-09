const { where } = require('sequelize/types');
const uuid = require('uuid');
const Reservations = require('../models/reservation.model');

const getAllReservations = async () => {
  const response = await Reservations.findAll()
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

const updateReservation = async (id, data) => {

  const { id, userId, roomId, status, ...restOfData } = data;
  const response = await Reservations.update(
    { ...restOfData },
    { where: { id } }
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

module.exports ={
  getAllReservations,
  getReservationById,
  createRervation,
  updateReservation,
  deleteReservation
}

