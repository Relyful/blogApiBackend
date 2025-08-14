const { Router } = require('express');
const postsController = require('../controllers/postsController');
const passport = require('passport');

const postsRouter = Router();

postsRouter.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.posts);

module.exports = postsRouter;