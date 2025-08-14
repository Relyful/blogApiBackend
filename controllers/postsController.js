const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.posts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: req.user.id
    }
  })
  res.json({
    ...posts
  })
}