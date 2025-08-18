const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const data = req.body;
  const newComment = await prisma.comment.create({
    data: {
      message: data.message,
      authorId: req.user.id,
      postId: req.params.postId
    }
  })
  return res.json({
    newComment
  })
}