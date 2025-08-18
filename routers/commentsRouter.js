const { Router } = require('express');
const commentsController = require('../controllers/commentsController');

const commentsRouter = Router();

commentsRouter.post('/', commentsController.createComment);

module.exports = commentsRouter;