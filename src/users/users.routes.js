const router = require('express').Router();
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');
require('../middleware/auth.middleware')(passport);

const usersServices = require('./users.http');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware,usersServices.getAll)/*ok*/ 

router.route('/me')
  .put(passport.authenticate('jwt', { session: false }), usersServices.editMyUser)/*ok*/
  .get(passport.authenticate('jwt', { session: false }), usersServices.getMyUser)/*ok*/
  .delete(passport.authenticate('jwt', { session: false }), usersServices.removeMyUser);/*ok*/

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware,usersServices.getById)/*ok*/
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, usersServices.remove)/*ok*/
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, usersServices.edit);/*ok*/ 

exports.router = router;
