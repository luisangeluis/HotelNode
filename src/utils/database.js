// const { Sequelize } = require('sequelize');
// manejar la configuracion con variables de entorno
// const db = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: '12345',
//   database: 'hotel',
//   port: '5432'
// })


// module.exports = {
//   db
// }

const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})


module.exports = {
  db
}