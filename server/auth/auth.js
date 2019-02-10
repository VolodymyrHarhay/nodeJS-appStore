
const Users = require('../model/users');
const jwtSecret = require('../config/jwtConfig');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

//Create a passport middleware to handle User signup
passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password',
  session: false,
}, async (email, password, done) => {
    try {
      const user = Users.filter(x => x.email === email);
      if (user.length) {
        console.log('username already taken');
        return done(null, false, { message: 'username already taken' });
      }
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const newUser = {
        email: email,
        password: hashedPassword
      }
      Users.push(newUser);
      return done(null, newUser);
    } catch (err) {
      done(err);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password',
  session : false
}, async (email, password, done) => {
  try {
    const user = Users.filter(x => x.email === email)[0];
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'User not found' });
    }
    else {
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        console.log('Wrong Password');
        return done(null, false, { message: 'Wrong Password' });
      }
      console.log('Logged in Successfully');
      return done(null, user);
    } 
  }
    catch (err) {
      done(err);
    }
}));


passport.use(new JWTstrategy({
  secretOrKey : jwtSecret.secret,
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (jwt_payload, done) => {
  try {
    const user = Users.filter(x => x.email === jwt_payload.id)[0];
    console.log('user in jwt = ',user);
    if(user) {
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
}));

//{"email":"1234","password":"1234"}
//http://localhost:5000/user/profile?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJpYXQiOjE1NDk4MTQ0NzR9.giAQE0xCwe26yJ7fX-3bieOyhNoOWiH66kp6_kbSPwg
