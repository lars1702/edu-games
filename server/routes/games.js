var express = require('express')
const Game = require('../models/game')
const passport = require('passport')
const config = require('../configs/index')
const jwt = require('jwt-simple')



var router = express.Router()

// Route to get all games
router.get('/', (req, res, next) => {
  Game.find() //gets all the games
    .then(games => { //then with that...
      res.json(games); //sends it
    })
    .catch(err => next(err))
})

// Route to add a game
router.post('/add-game', (req, res, next) => {
  let {name, keywords, description} = req.body
  Game.create({name, keywords, description})
    .then(game => {
      console.log(game._id)
      res.json({
        success: true,
        game
      })
    })
    .catch(err => next(err))
})

/////////////////////////////////
// Route to look at gamedetail //
/////////////////////////////////
router.get('/:gameId', (req, res, next) => {
  Game.findById(req.params.gameId) //get the current game
    .then(game => { //then with that game ->
      res.json(game); //send it
    })
    .catch(err => next(err))
})

////////////////////////
// Route to edit game //
////////////////////////
router.put('/:gameId', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let {name, keywords, description} = req.body
  Game.findByIdAndUpdate(
    req.params.gameId,
    {name, keywords, description} //save user id in your document. But not taking from req.body ----- _owner: req.user._id
  )
  .then(game => {
    res.json({
      success: true,
      game
    })
  })
  .catch(err => next(err))
})

//////////////////////////
// Route to delete game //
//////////////////////////
router.delete('/:gameId', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Game.findByIdAndRemove(req.params.gameId)
  .then( () => {
    res.json({success: true})
  })
  .catch(err => next(err))
})



module.exports = router
