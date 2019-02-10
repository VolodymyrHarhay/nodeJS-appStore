
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
      if (user) {
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
    const user = Users.filter(x => x.email === email);
    if (!user) {
      console.log('username already taken');
      return done(null, false, { message: 'User not found' });
    }
     else {
      const validate = await bcrypt.compare(password, user.password)
      if (!validate) {
        console.log('passwords do not match');
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
    const user = Users.filter(x => x.email === jwt_payload.id);
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