const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../configs/index');


router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request
  const { email, name, password } = req.body;
  const user = new User({
    email,
    name
  });

  User.register(user, password, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

router.post('/login', (req, res, next) => {
  const authenticate = User.authenticate()
  const { email, password } = req.body
  if (email && password) {
    authenticate(email, password, (err, user, failed) => {
      if (err) return next(err)
      if (failed) return res.status(401).json({ error: failed.message })
      if (user)
        res.json({
          token: jwt.encode(user.id, config.jwtSecret),
          name: user.name
        })
    })
  } else res.sendStatus(401)
})

router.get('/secret', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  res.json({
    answerToLifeTheUniverseAndEverything: 42,
    user: req.user
  })
})

module.exports = router