const { PrismaClient } = require('../generated/prisma');
const { body, validationResult } = require("express-validator");


const prisma = new PrismaClient();

const validateComment = [
  body('message').trim()
    .isLength({min: 1}),
  ]
  

exports.createComment = [
  validateComment, 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body)
      console.log(errors);
      return res.sendStatus(400);
    }
  const data = req.body;
  const newComment = await prisma.comment.create({
    data: {
      message: data.message,
      author: {
        connect: {
          id: req.user.id,
        }
      },
      post: {
        connect: {
          id: Number(req.params.postId),
        }
      }
    },
    include: {
      author: true,
    }
  })
  return res.status(201).json(newComment);
}]

exports.updateOwnComment = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const commentId = req.params.commentId;

  const ownershipCheck = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: Number(user.id)
    }
  })
  if(!ownershipCheck) {
    return res.sendStatus(404);
  }
  await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      message: data.message
    }
  })
  return res.sendStatus(200);
}

exports.removeOwnComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const user = req.user;

  const ownershipCheck = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: Number(user.id)
    }
  })
  if(!ownershipCheck) {
    return res.sendStatus(404);
  }

  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })
}

exports.removeCommentAdmin = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const user = req.user;

  const userDb = await prisma.user.findFirst({
    where: {
      id: user.id,
    }
  })
  if (userDb.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })
  return res.sendStatus(200);
}