//Dependencies
const express = require('express');
const passport = require('passport');
const { verbMiddleware } = require('./middleware/examples/verbs');
require('./middleware/auth.middleware')(passport);

const path =require('path');

//Routes Files
const usersRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router

//DB files
const initModels = require('./models/init.models');
const defaultData =require('./utils/defaultData');

const {db} = require('./utils/database');
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

app.get("/api/v1/uploads/:imgName", (req ,res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploads/') + '/' +imgName)
})

app.get('/ejemplo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Felicidades, tienes credenciales para entrar aqui',email:req.user.email });
  })

app.listen(3000, () => {
  console.log('server started at port:3000');
});


module.exports={
  app
}
