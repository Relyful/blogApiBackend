const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const data = req.body;
  console.log(data);
  await prisma.comment.create({
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
    }
  })
  return res.sendStatus(201);
}

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
  const commentId = req.params.commentId;
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

  if (user.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })
  return res.sendStatus(200);
}