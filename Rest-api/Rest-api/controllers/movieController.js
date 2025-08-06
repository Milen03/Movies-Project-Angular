const { userModel, themeModel, movieModel } = require('../models');

function newPost(text, userId, themeId) {
    return movieModel.create({ text, userId, themeId })
        .then(post => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { themes: themeId } }),
                themeModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
            ])
        })
}

function getLatestsMovie(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    movieModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}


function getMovieById(req, res, next) {
    const { id } = req.params;
    movieModel.findById(id)
        .then(movie => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ message: 'Movie not found!' });
            }
        })
        .catch(next);
}

function createMovie(req, res, next) {
    const { title, genre, releaseDate, description, imageUrl } = req.body;
    const { _id: userId } = req.user;

    movieModel.create({ title, genre, releaseDate, description, imageUrl, createdBy: userId })
        .then(movie => res.status(201).json(movie))
        .catch(next);
}

function editMovie(req, res, next) {
    const { id } = req.params;
    const { title, genre, releaseDate, description, imageUrl } = req.body;
    const { _id: userId } = req.user;

    movieModel.findOneAndUpdate(
        { _id: id, createdBy: userId },
        { title, genre, releaseDate, description, imageUrl },
        { new: true }
    )
    .then(updatedMovie => {
        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(401).json({ message: `Not allowed!` });
        }
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    movieModel.findOneAndDelete({ _id: id, createdBy: userId })
        .then(deletedOne => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    movieModel.updateOne({ _id: id }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}
module.exports = {
    getLatestsMovie,
    newPost,
    getMovieById,
    createMovie,
    editMovie,
    deleteMovie,
    like,
}
