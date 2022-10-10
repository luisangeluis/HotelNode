const router = require('express').Router();
//passport
const passport = require('passport');
//services
const roomsservices = require('./rooms.http');
const { post } = require('../reservations/reservations.http')
//middlewares
const { roleAdminMiddleware,roleGuestMiddleware } = require('../middleware/adminRole.middleware');
//set passport
require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(roomsservices.getAll)
  .post(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, roomsservices.addRoom)

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt', { session: false }),roleGuestMiddleware,post)

router.route('/:id')
  .get(roomsservices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, roomsservices.editRoom)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, roomsservices.deleteRoom)

exports.router = router;

