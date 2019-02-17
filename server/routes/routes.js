
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      const error = new Error('An Error occured')
      return next(error);
    };
    if (info) {
      res.json({
        message: info,
        user : null,
        err: true
      });
    }
    else {
      res.json({ 
        message : 'Signup successful',
        user : user,
        err: false
      });
    }
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if(err) {
        const error = new Error('An Error occured')
        return next(error);
      } else if (info) {
        res.json({
          message: info,
          user : null,
          err: true
        });
      } else {
        req.login(user, {session: false}, (error) => {
          if (error) return next(error)
          const token = jwt.sign({ id: user.email }, jwtSecret.secret);
          //Send back the token to the user
          return res.json({
            auth: true,
            token: token,
            message: 'User found & logged in',
            user: user,
            err: false
          })
        });
      }
    }
    catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// app.get('/api/getTestData', (req, res) => {
//   res.send('Hello World 2');
// });

module.exports = router;
