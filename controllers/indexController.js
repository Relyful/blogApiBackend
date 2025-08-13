const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.getIndex = (req, res) => {
  res.send('Hello World :)');
}

exports.postLogin = async (req, res) => {
  const userData = req.user;
  const token = jwt.sign({id: userData.id, username: userData.username}, process.env.SECRET, { expiresIn: "1m"});
  res.json({
    token
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

exports.authTest = async (req, res) => {
  res.json({
    user: req.user
  })
}