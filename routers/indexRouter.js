const { Router } = require('express');
const indexController = require('../controllers/indexController');
const passport = require('passport');

const indexRouter = Router();

indexRouter.get('/', indexController.getIndex);
indexRouter.post('/register', indexController.postRegister);
indexRouter.post('/login', passport.authenticate('local', {session: false, failureRedirect: '/'}), 
  indexController.postLogin);

module.exports = indexRouter;