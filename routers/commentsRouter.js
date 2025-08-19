const { Router } = require('express');
const commentsController = require('../controllers/commentsController');

const commentsRouter = Router();

commentsRouter.post('/', commentsController.createComment);
commentsRouter.put('/:commentId', commentsController.updateOwnComment);

module.exports = commentsRouter;