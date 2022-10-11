const Users = require('../models/user.model');
const Roles = require('../models/role.model');
const Rooms = require('../models/room.model');
const Reservations = require('../models/reservation.model');

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
      lastName: 'zepeda',
      email: 'luis@correo.com',
      password: '$2b$10$aCwfO/u45Ij7QZUt4Z1ekOQBrIy7/aSEwOYZn/AqISdnqSUHUIKlK',
      phone: '1234567890',
      // addres: 'mi direccion',
      roleId: '5ee551ed-7bf4-44b0-aeb5-daaa824b9473',
      status: 'active',
      verified: false
    },
    {
      id: 'de333663-1ab5-4b86-ab29-9b4e449f8191',
      firstName: 'angel',
      lastName: 'gonzalez',
      email: 'angel@correo.com',
      password: '$2b$10$aCwfO/u45Ij7QZUt4Z1ekOQBrIy7/aSEwOYZn/AqISdnqSUHUIKlK',
      phone: '1234567890',
      // addres: 'mi direccion',
      roleId: 'fef3a08d-2cec-4728-9745-7cbd2b37e557',
      status: 'active',
      verified: false
    }
  ])

  await Rooms.bulkCreate([
    {
      id: 'a9004d1d-0b1f-44b9-9230-7b96d69a45f9',
      title: 'room 1',
      description: 'su descripcion',
      guests: '4',
      beds: '2',
      bathrooms: 1.5,
      price: 200,
      isActive: true
    },
    {
      id: '5dfe81dc-9f27-4008-b80d-3b59da5d700c',
      title: 'room 2',
      description: 'su descripcion',
      guests: '2',
      beds: '1',
      bathrooms: 1,
      price: 100,
      isActive: true
    },
    {
      id: 'd1ce6419-f266-41f5-887c-4a4c2ae370d0',
      title: 'room 3',
      description: 'su descripcion',
      guests: '6',
      beds: '3',
      bathrooms: 2,
      price: 300,
      isActive: true
    },

  ])

  await Reservations.bulkCreate([
  {
      kids: 0,
      babies: 0,
      pets: 0,
      arrival: "2020-10-10T05:00:00.000Z",
      departure: "2020-10-10T05:00:00.000Z",
      adults: 2,
      identificacion: "12345",
      address: "mi direccion",
      paymentMethod: "efectivo",
      id: "0fc11821-4e7e-4a03-acc5-658e499b0421",
      userId: "de333663-1ab5-4b86-ab29-9b4e449f8191",
      roomId: "a9004d1d-0b1f-44b9-9230-7b96d69a45f9",
      state: "pendiente",
    }
  ]
    
  )
}

module.exports = generateData;