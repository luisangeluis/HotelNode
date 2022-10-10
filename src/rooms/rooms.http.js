const roomsControllers = require('./rooms.controllers');

const getAll = (req, res) => {
  roomsControllers.getAllRooms()
    .then(response => res.status(200).json({ items: response.length, rooms: response }))
    .catch(error => res.status(400).json({ error: error.message }))
}

const getById = (req, res) => {
  const roomId = req.params.id;

  roomsControllers.getRoomById(roomId)
    .then(response => {
      if (response) return res.status(200).json(response)
      else return res.status(404).json({ message: `The room with id:${roomId} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const addRoom = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.title || !data.description || !data.guests || !data.beds || !data.bathrooms || !data.price) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        title: 'string',
        description: 'string',
        guests: 'Type a num',
        beds: 'Type a num',
        bathrooms: 'Type a num',
        price: 'Type a price'
      }
    })
  } else {
    roomsControllers.createRoom(data)
      .then(response => {
        return res.status(201).json({
          message: `Room created successfully with id:${response.id}`,
          room: response
        })
      })
      .catch(error => res.status(400).json({ message: error.message }))
  }
}

const editRoom = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  roomsControllers.updateRoom(id, data)
    .then(response => {
      if (response) {
        return res.status(200).json({ message: `Room with id:${id} edit successfully` });
      } else {
        return res.status(404).json({ message: `Room with id:${id} doesn't exist` });
      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message });
    })
}

const deleteRoom = (req, res) => {
  const id = req.params.id;

  roomsControllers.deleteRoom(id)
    .then(response => {
      if (response) {
        return res.status(204).json()
      } else {
        return res.status(404).json({ message: `Room with id ${id} doesn't exist` })
      }
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

module.exports={
  getAll,
  getById,
  addRoom,
  editRoom,
  deleteRoom
}

