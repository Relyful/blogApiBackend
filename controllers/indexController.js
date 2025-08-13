const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.getIndex = (req, res) => {
  res.send('Hello World :)');
}

exports.postLogin = async (req, res) => {
  const xdToken = Math.random()*1000000000;
  res.json({
    token: xdToken,
    user: req.user
  })
}

exports.postRegister = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      role: data.role
    }
  })
  console.log(user);
  res.json({
    status: 'success'
  })
}