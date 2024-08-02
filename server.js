require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require("./config/db");
const router = require("./router/router");

const app = express();
app.use(express.json());

app.use(session({
    secret:process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1853/api/v1/google/callback",
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, cb) {
   
      return cb(null, profile);
    
  }
));

passport.serializeUser((user, done)=>{
  done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
  });

  app.use("/api/v1/", router);

const Port = process.env.PORT || 1853
app.listen(Port,()=>{
    console.log(`server is listening to PORT: ${Port}.`)
});



