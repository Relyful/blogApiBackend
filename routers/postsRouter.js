const { Router } = require('express');
const postsController = require('../controllers/postsController');
const passport = require('passport');
const commentsRouter = require('./commentsRouter');

const postsRouter = Router();

postsRouter.use('/:postId/comments', commentsRouter);

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.postPosts);
postsRouter.get('/:postId', postsController.getPost);
postsRouter.delete('/:postId', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.deletePost);
postsRouter.put('/:postId', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), postsController.updatePost);

module.exports = postsRouter;