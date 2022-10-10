const router = require('express').Router();
//passport
const passport = require('passport');
//services
const reservationsServices = require('./reservations.http');
//Middlewares
const { roleAdminMiddleware,roleGuestMiddleware } = require('../middleware/adminRole.middleware');

//Set passport
require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getAll)

router.route('/my-reservations')
  .get(passport.authenticate('jwt', { session: false }),roleGuestMiddleware, reservationsServices.getMyreservations)

router.route('/my-reservations/:id')
  .get(passport.authenticate('jwt', { session: false }), roleGuestMiddleware,reservationsServices.getMyReservation)
  .put(passport.authenticate('jwt', { session: false }), roleGuestMiddleware,reservationsServices.editMyReservation)
  .delete(passport.authenticate('jwt', { session: false }), roleGuestMiddleware,reservationsServices.deleteMyReservation)

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.edit)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.remove)

exports.router = router;