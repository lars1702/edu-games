const express = require('express')
const Dictionary = require('../models/dictionary')


const router = express.Router()

//find all dictionary entries
router.get('/dictionary', (req, res, next) => {
  Dictionary.find().then(d => res.json(d))
  .catch(err => next(err))
})
