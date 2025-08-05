const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const {  movieController } = require('../controllers');

// middleware that is specific to this router

router.put('/:movieId', auth(), movieController.like);

module.exports = router
