const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fileUrl: {
        type: String,
        default: null
    },
    fileId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending'
    }
}, {
    timestamps: true
})

const musicModel = mongoose.model('music', musicSchema);

module.exports = musicModel;