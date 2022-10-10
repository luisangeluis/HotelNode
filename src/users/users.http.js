const userControllers = require('./users.controllers');

const getAll = (req, res) => {
  userControllers.getAllUsers()
    .then(response => {
      res.status(200).json({ items: response.length, users: response });
    })
    .catch(err => {
      res.status(400).json({ err })
    });
};

const getById = (req, res) => {
  const id = req.params.id;

  userControllers.getUserById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    })
}

const register = (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.phone
  ) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        firstName: 'string',
        lastName: 'string',
        email: 'example@example.com',
        password: 'string',
        phone: '1234567890',
      },
    });
  } else {
    userControllers.createUser(data)
      .then(response => {
        res.status(201).json({
          message: `User created sucefully with id:${response.id}`,
          user: response,
        })
      })
      .catch(err => {
        res.status(400).json({ message: err })
      })

  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers.deleteUser(id)
    .then(response => {
      if (response) {
        return res.status(204).json();
      }
      else {
        return res.status(400).json({ message: 'Invalid Id' });
      }
    })
    .catch(error => res.status(400).json({ message: error.message }))
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }
  userControllers.updateUser(id, data)
    .then(response => {
      if (response) return res.status(200).json({ message: `User with id:${id} edited successfully` })
      else return res.status(404).json({ message: `User with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const editMyUser = (req, res) => {
  const id = req.user.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  userControllers.updateMyUser(id, data)
    .then(response => {
      if (response) return res.status(200).json({ message: `User with id:${id} edited successfully` })
      else return res.status(404).json({ message: `User with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const getMyUser = (req, res) => {
  const id = req.user.id;

  userControllers.getUserById(id)
    .then(response => {
      if (response) return res.status(200).json(response)
      else return res.status(404).json({ message: `User with id${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const removeMyUser = (req, res) => {
  const id = req.user.id;
  
  userControllers.deleteUser(id)
    .then(response=>{
      if(response) return res.status(204).json()
      else return res.status(404).json({message:`User with id${id} doesn't exist`})
    })
    .catch(error=>res.status(400).json({message:error.message}))
};


module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyUser,
  getMyUser,
  removeMyUser
};
