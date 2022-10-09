const Users = require('../models/user.model');
const Roles = require('../models/role.model');

const generateData = async () => {
  await Roles.bulkCreate([
    { name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557" },
    // { name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500" },  
    { name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473" }
  ], { validate: true });

  await Users.bulkCreate([
    {
      id: '45ff6cc8-5b7f-4ea9-a358-70b7c3bd1d17',
      firstName: 'luis',
      lastName: 'gomez',
      email: 'luis@correo.com',
      password: '$2b$10$h89hUxFHMcnkVMLfqc97p.ckEzh/RGef4Wqf52o0V0gQsCRlwWp7u',
      phone: '1234567890',
      addres: 'mi direccion',
      roleId: 'fef3a08d-2cec-4728-9745-7cbd2b37e557',
      status: 'active',
      verified: false
    }
  ])
}

module.exports = generateData;