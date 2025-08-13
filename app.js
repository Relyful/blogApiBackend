const express = require('express');
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('./generated/prisma');
const passport = require("passport");
const path = require("path");
const LocalStrategy = require('passport-local');


const indexRouter = require('./routers/indexRouter');

//dotenv setup
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();
const app = express();

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up Public files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//Setup passport-local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!user) {
      return done(null, false)
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false);
    }
    return done(null, user);
  })
)

app.use('/', indexRouter);

//Catch all route
app.get("/*splat", async (req, res) => {
  res.send("You cannot be here :( .");
});

//Error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('errPage',{
    errMessage: err.message
  });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));