const { Router } = require('express');
const commentsController = require('../controllers/commentsController');
const passport = require('passport');

const commentsRouter = Router({ mergeParams: true});

commentsRouter.post('/', passport.authenticate('jwt', {session: false}), commentsController.createComment);
commentsRouter.put('/:commentId', commentsController.updateOwnComment);
commentsRouter.delete('/:commentId', commentsController.removeOwnComment);
commentsRouter.delete('/admin/:commentId', passport.authenticate('jwt', {session: false}), commentsController.removeCommentAdmin);

module.exports = commentsRouter;