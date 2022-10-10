const router =require('express').Router();
const authServices =require('./auth.http');
const {register} = require('../users/users.http')

router.post('/login',authServices.login);/*ok*/
router.post('/register',register)/*ok*/
  
exports.router = router;

// GET
// POST
// PUT
// PATCH
