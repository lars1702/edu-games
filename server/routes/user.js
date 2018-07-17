const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/game');
const passport = require('passport');
const config = require('../configs/index');
const uploadCloud = require('../configs/cloudinary');
//find user and .push stuff from favs there

// Route to get profile

router.get("/profile", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  User.findById(req.user.id)
  .populate('_favs _games')
  .then(currentUser => {
    res.json(currentUser)
  })
});

// Route to add a picture on one user with Cloudinary
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/first-user/users/pictures
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/first-user/pictures">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>
router.post('/add-game', uploadCloud.single('picture'), (req, res, next) => {
  console.log('DEBUG req.file', req.file, req.body);
  let newGame = {
    name: req.body.name,
    description: req.body.description,
    keywords: req.body.keywords,
    gameURL: req.body.gameURL,
    imgURL: req.file.url,
  }
  Game.create(newGame)
    .then((newGame) => {
      res.json({
        success: true,
        newGame
      })
    })
});

// router.post("/add-game", uploadCloud.single("picture"))

module.exports = router;