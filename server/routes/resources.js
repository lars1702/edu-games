const express = require('express')
const Dictionary = require('../models/dictionary')


const router = express.Router()

//find all dictionary entries
router.get('/dictionary', (req, res, next) => {
  Dictionary.find().then(dict => res.json(dict))
  .catch(err => next(err))
})

module.exports = router