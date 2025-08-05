const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);
router.post('/', auth(), moviesController.createMovie);
router.put('/:id', auth(), moviesController.updateMovie);
router.delete('/:id', auth(), moviesController.deleteMovie);
router.put('/:id/like', auth(), moviesController.likeMovie);

module.exports = router;