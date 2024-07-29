require ("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const database = require("./config/database");
const router = require("./router/router");

const app = express();
app.use(express.json());

app.use(session({
    secret:process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use("/api/v1/",router);


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1853/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const Port = process.env.PORT || 1853
app.listen(Port,()=>{
    console.log(`server is  up listening to PORT: ${Port}.`)
}) 
