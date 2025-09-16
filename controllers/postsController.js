const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts)
}

exports.postPosts = async (req, res) => {
  const data = req.body;
  await prisma.post.create({
    data: {
      title: data.title,
      message: data.message,
      published: data.published,
      authorId: req.user.id
    }
  })
  res.sendStatus(201);
}

exports.getPost = async (req, res) => {
  const posts = await prisma.post.findUnique({
    where: {
      id: Number(req.params.postId)
    },
    include: {
      comments: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    }
  });
  console.log(posts);
  res.json(posts)
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

  await prisma.post.delete({
    where: {
      id: postId
    }
  })
  return res.sendStatus(200);
}

exports.updatePost = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const postId = Number(req.params.postId);
  const checkPost = await prisma.findFirst({
    where: {
      id: postId,
      authorId: user.id
    }
  })
  if (!checkPost) {
    return res.status(404).json({
      error: 'Not found'
    })
  }
  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title: data.title,
      message: data.message
    }
  });
  res.sendStatus(200);
}