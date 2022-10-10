//Dependencies
const express = require('express');
const passport = require('passport');
const { verbMiddleware } = require('./middleware/examples/verbs');
require('./middleware/auth.middleware')(passport);

const path =require('path');

//Routes Files
const usersRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const reservationsRouter =require('./reservations/reservations.routes').router;
const roomsRouter = require('./rooms/rooms.routes').router;
//DB files
const initModels = require('./models/init.models');
const defaultData =require('./utils/defaultData');

const {db} = require('./utils/database');
const PORT = process.env.PORT || 3000;

//Configuraciones iniciales
const app = express();

initModels();
db.authenticate()
  .then(res=>console.log('database autenticate'))
  .catch(error=>console.log(error))

//{force:true}// es solo para desarrollo.
if (process.env.NODE_ENV === 'production') {
  db.sync()
    .then(() => {
      console.log('database synced');
      defaultData();
    })
    .catch(error => console.log(error))
} else {
  db.sync({ force: true })
  // db.sync()
    .then(() => {
      console.log('database synced');
      defaultData();
    })
    .catch(error => console.log(error))
}
//para que el body de la peticion no salga undefined
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reservations',reservationsRouter);
app.use('/api/v1/rooms',roomsRouter);

app.get('/ejemplo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Felicidades, tienes credenciales para entrar aqui',email:req.user.email });
  })

app.listen(PORT, () => {
  console.log(`server started at port:${PORT}`);
});


module.exports={
  app
}
