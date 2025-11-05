const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage("Username must be between 5 and 10 characters"),
  body("password").trim(),
];

exports.getIndex = (req, res) => {
  res.send("Hello World :)");
};

exports.postLogin = async (req, res) => {
  const userData = req.user;
  const token = jwt.sign(
    { id: userData.id, username: userData.username },
    process.env.SECRET,
    { expiresIn: "1h" },
  );
  res.json({ token, userData });
};

exports.postRegister = [
  validateRegister,
  async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: "Username must be between 5 and 10 characters"});
    }
    if (data.username.length < 4 || data.username.length > 10) {
      return res.json({ error: "Username too short or too long" });
    }
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prisma.user.create({
        data: {
          username: data.username,
          password: hashedPassword,
          role: data.role,
        },
      });
      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      if (error.code === "P2002") {
        return res.json({ error: "Username already exists" });
      }
      throw error;
    }
  },
];

exports.authTest = async (req, res) => {
  res.json({
    user: req.user,
  });
};
