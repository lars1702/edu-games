var express = require('express');
const Fav = require('../models/fav')
const passport = require('passport');
const config = require('../configs/index');
const jwt = require('jwt-simple');



var router = express.Router();

// Route to get all favs
router.get('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Fav.find({_owner: req.user._id}) //gets all the favs
    .populate("_games")
    .then(favs => { //then with that...
      res.json(favs); //sends it
    })
    .catch(err => next(err))
});

// Route to add a fav
router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let {title} = req.body
  let _owner = req.user._id
  Fav.create({title,_owner})
    .then(fav => {
      console.log(fav._id)
      res.json({
        success: true,
        fav
      });
    })
    .catch(err => next(err))
});

/////////////////////////////////
// Route to look at favdetail //
/////////////////////////////////
router.get('/:favId', (req, res, next) => {
  Fav.findById(req.params.favId) //get the current fav
    .then(fav => { //then with that fav ->
      res.json(fav); //send it
    })
    .catch(err => next(err))
});

router.post('/:favId/games', (req, res, next) => {
  let gameId = req.body.gameId
  if (!gameId) {
    next(new Error("No game id precised"))
    return;
  }
  Fav.findByIdAndUpdate(req.params.favId, { $push: { _games:  gameId} }, {new: true})
  .then(fav => {
    res.json({
      success: fav !== undefined,
      fav
    })
  })
})


module.exports = router;
