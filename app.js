const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const path = require("path");


const indexRouter = require('./routers/indexRouter');

//dotenv setup
require('dotenv').config();

const PORT = process.env.port || 8080;

const app = express();

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up Public files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use('/', indexRouter);

//Catch all route
app.get("/*splat", async (req, res) => {
  res.send("You cannot be here :( .");
});

//Error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('errPage',{
    errMessage: err.message
  });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));