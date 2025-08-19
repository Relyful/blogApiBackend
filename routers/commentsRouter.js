const { Router } = require('express');
const commentsController = require('../controllers/commentsController');

const commentsRouter = Router();

commentsRouter.post('/', commentsController.createComment);
commentsRouter.put('/:commentId', commentsController.updateOwnComment);
commentsRouter.delete('/:commentId', commentsController.removeOwnComment);
commentsRouter.delete('/admin/:commentId', commentsController.removeCommentAdmin);

module.exports = commentsRouter;