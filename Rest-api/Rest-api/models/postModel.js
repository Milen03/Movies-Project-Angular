const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date
    },

    imageUrl: {
        type: String
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);
