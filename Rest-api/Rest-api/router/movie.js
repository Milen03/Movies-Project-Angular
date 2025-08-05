const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const moviesController = require('../controllers/movieController.js');

router.get('/', moviesController.getLatestsMovie);
router.get('/:id', moviesController.getMovieById);
router.post('/', auth(), moviesController.createMovie);
router.put('/:id', auth(), moviesController.editMovie);
router.delete('/:id', auth(), moviesController.deleteMovie);
router.put('/:id/like', auth(), moviesController.newPost);

module.exports = router;