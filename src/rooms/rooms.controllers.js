const uuid = require('uuid');
const Rooms = require('../models/room.model');

const getAllRooms = async () => {
  const response = await Rooms.findAll();
  return response;
}

const getRoomById = async (id) => {
  const response = await Rooms.findOne({
    where: { id }
  })

  return response;
}

const createRoom = async = async (data) => {
  const response = await Rooms.create({
    ...data,
    id: uuid.v4(),
  })

  return response;
}

const updateRoom = async (roomId, data) => {
  const { id, ...restOfData } = data;

  const response = await Rooms.update(
    { ...restOfData },
    { where: { id: roomId } }
  )

  return response;
}

const deleteRoom = async (id) => {
  const active = { isActive: false }
  const response = await Rooms.update(
    {
      ...active
    },
    {where:{id}}
  )

  return response;
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
}