const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({
    ...posts
  })
}

exports.postPosts = async (req, res) => {
  const data = req.body;
  const post = await prisma.post.create({
    data: {
      title: data.title,
      message: data.message,
      published: data.published,
      authorId: req.user.id
    }
  })
  res.json({
    post
  })
}

exports.getPost = async (req, res) => {
  const posts = await prisma.post.findUnique({
    where: {
      id: Number(req.params.postId)
    },
    include: {
      comments: true,
    }
  })
  res.json({
    posts
  })
}

// const posts = await prisma.post.findMany({
//     where: {
//       authorId: req.user.id
//     }
//   })