const reservationsControllers = require('./reservations.controllers');

const getAll = (req, res) => {
  //TODO REVISAR que data mas concatenar
  reservationsControllers.getAllReservations()
    .then(response => res.status(200).json({ items: response.length, reservations: response }))
    .catch(error => res.status(400).json({ message: error.message }))
}

const getById = (req, res) => {
  //TODO REVISAR que data mas concatenar

  const id = req.params.id;

  reservationsControllers.getReservationById(id)
    .then(response => {
      if (response) return res.status(200).json(response)
      else return res.status(404).json({ message: `Reservation with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const post = (req, res) => {
  const userId = req.user.id;
  const roomId = req.params.id;
  const data = req.body;
  //TODO check out the payment method and invoicing and avaible dates
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.arrival || !data.departure || !data.adults ||!data.identificacion ||!data.address || !data.paymentMethod) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        arrival: 'date',
        departure: 'date',
        adults: 'Type a num',
        identificacion: 'Type your identification Id',
        address:'Type your address Id',
        paymentMethod:'Type your payment method'
      }
    })
  } else {
    reservationsControllers.createRervation(userId, roomId, data)
      .then(response => {
        return res.status(201).json(response)
      })
      .catch(error => res.status(400).json({ message: error.message }))
  }
}

const edit = (req, res) => {
  const reservationId = req.params.id;
  const data = req.body

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  reservationsControllers.updateReservation(reservationId, data)
    .then(response => {
      if (response)
        return res.status(200).json({ message: `Reservation with id:${reservationId} edited successfully` });
      else
        return res.status(404).json({ message: `Reservation with id $${reservationId} doesn't exist` });
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const remove = (req, res) => {
  const reservationId = req.params.id;

  reservationsControllers.deleteReservation(reservationId)
    .then(response => {
      if (response)
        return res.status(204).json();
      else
        return res.status(404).json({ message: `Reservation with id ${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const getMyreservations = (req, res) => {
  const userId = req.user.id;

  reservationsControllers.readMyReservations(userId)
    .then(response => res.status(200).json({ items: response.length, reservations: response }))
    .catch(error => res.status(400).json({ message: error.message }))
}

const getMyReservation = (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.id;

  reservationsControllers.readMyReservation(userId, reservationId)
    .then(response => {
      if (response) return res.status(200).json(response)
      else return res.status(404).json({ message: `Reservation with id${reservationId} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const editMyReservation = (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  reservationsControllers.updateMyReservation(userId, reservationId, data)
    .then(response => {
      if (response) return res.status(200).json({ message: `Reservation with id:${reservationId} edited successfully` })
      else return res.status(404).json({ message: `Reservation with id:${reservationId} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const deleteMyReservation = (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.id;

  reservationsControllers.deleteMyReservation(userId,reservationId)
    .then(response=>{
      if(response) return res.status(204).json()
      else return res.status(404).json({message:`Reservation with id:${reservationId} doesn't exist`})
    })
    .catch(error=>res.status(400).json({message:error.message}))
}

module.exports={
  getAll,
  getById,
  post,
  edit,
  remove,
  getMyreservations,
  getMyReservation,
  editMyReservation,
  deleteMyReservation
}