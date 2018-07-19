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
  console.log("ENTERING PROFILE ROUTE")
  User.findById(req.user.id)
  .populate('_games')
  .populate({
        path: '_favs.games',
        model: 'Game'
      }
    
  )

  .then(currentUser => {
    console.log("LEAVING PROFILE ROUTE", currentUser)
    res.json(currentUser)
  })
});


router.post('/add-game', uploadCloud.single('picture'), (req, res, next) => {
  console.log('DEBUG req.file', req.body);
  
  let newGame = {
    name: req.body.name,
    description: req.body.description,
    keywords: req.body.keywords.split(","),
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

router.post('/add-to-fav',  passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  let userId = req.user.id;
  let ListName = req.body.newFavGame.value;
  let gameId = req.body.gameId;
  
  console.log("\nUSER:", userId,"\nLIST:",ListName, "\nGAME:",gameId)

  User.findById(userId)
  .then((user)=>{
    console.log(user._favs)
  })

  // {
  //   title: String,
  //   games: [{type: Schema.Types.ObjectId, ref: "Game"}]
  // }
  
})


// router.post("/add-game", uploadCloud.single("picture"))

module.exports = router;