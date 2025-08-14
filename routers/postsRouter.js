const { Router } = require('express');
const postsController = require('../controllers/postsController');
const passport = require('passport');

const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.postPosts);
postsRouter.get('/:postId', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.getPost);

module.exports = postsRouter;