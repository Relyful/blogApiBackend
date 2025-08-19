const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const data = req.body;
  await prisma.comment.create({
    data: {
      message: data.message,
      authorId: req.user.id,
      postId: req.params.postId
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
      authorId: user.id
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

// exports.removeOwnComment = async (req, res) => {

// }