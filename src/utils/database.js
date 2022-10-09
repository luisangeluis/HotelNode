const { Sequelize } = require('sequelize');
//todo manejar la configuracion con variables de entorno
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '12345',
  database: 'hotel',
  port: '5432'
})


module.exports = {
  db
}