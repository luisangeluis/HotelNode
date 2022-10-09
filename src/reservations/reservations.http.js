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
  const userId = req.user.i;
  const roomId = req.params.id;
  const data = req.body;
  //TODO check out the payment method and invoicing and avaible dates
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.arrival || !data.departure || !data.adults) {
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
        return res.status(200).json({ message: `Reservation with id:${reservationId} edit successfully` });
      else
        return res.status(404).json({ message: `Reservation with id $${reservationId} doesn't exist` });
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const remove = (req, res) => {
  const reservationId = req.params.id;

  reservationsControllers.deleteReservation(id)
    .then(response => {
      if (response)
        return res.status(204).json();
      else
        return res.status(404).json({ message: `Reservation with id ${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}