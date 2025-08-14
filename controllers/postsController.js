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

exports.deletePost = async (req, res) => {
  const postId = Number(req.params.postId);
  const userId = req.user.id;

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId
    }
  })

  if (!post) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId
    }
  })
  return res.json({
    deletedPost
  })
}

// const posts = await prisma.post.findMany({
//     where: {
//       authorId: req.user.id
//     }
//   })