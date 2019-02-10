
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({ 
    message : 'Signup successful',
    user : req.user 
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if(err || !user) {
        const error = new Error('An Error occured')
        return next(error);
      } else if (info) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.login(user, {session: false}, (error) => {
          if (error) return next(error)
          const token = jwt.sign({ id: user.email }, jwtSecret.secret);
          //Send back the token to the user
          return res.json({
            auth: true,
            token: token,
            message: 'user found & logged in',
            user: user
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
