const musicModel = require('../models/music.model');
const { uploadFile, deleteFile } = require('../services/storage.service');

// User: Create music (status defaults to 'pending')
async function createMusic(req, res) {
    try {
        if (!req.body.title) return res.status(400).json({ message: 'title is required' });

        let fileUrl = null;
        let fileId = null;
        if (req.file) {
            const result = await uploadFile(req.file.buffer);
            fileUrl = result.url;
            fileId = result.fileId;
        }

        const music = await musicModel.create({ title: req.body.title, artist: req.user.id, fileUrl, fileId });
        return res.status(201).json({ message: 'Music created', music });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// User: Get their own music
async function getMyMusic(req, res) {
    try {
        const musics = await musicModel.find({ artist: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json({ count: musics.length, musics });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// User: Update their own music
async function updateMusic(req, res) {
    try {
        if (!req.body.title && !req.file) return res.status(400).json({ message: 'title or file is required' });
        const { musicId } = req.params;
        const music = await musicModel.findOne({ _id: musicId, artist: req.user.id });
        if (!music) return res.status(404).json({ message: 'Music not found' });

        if (req.body.title) music.title = req.body.title;
        
        if (req.file) {
            // Delete old file from ImageKit if it exists
            if (music.fileId) await deleteFile(music.fileId);
            const result = await uploadFile(req.file.buffer);
            music.fileUrl = result.url;
            music.fileId = result.fileId;
        }
        
        await music.save();
        return res.status(200).json({ message: 'Music updated', music });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// User: Delete their own music
async function deleteMyMusic(req, res) {
    try {
        const music = await musicModel.findOneAndDelete({ _id: req.params.musicId, artist: req.user.id });
        if (!music) return res.status(404).json({ message: 'Music not found' });
        if (music.fileId) await deleteFile(music.fileId);
        return res.status(200).json({ message: 'Music deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Admin: Get all music
async function getAllMusic(req, res) {
    try {
        const musics = await musicModel.find().sort({ createdAt: -1 }).populate('artist', 'username email');
        return res.status(200).json({ count: musics.length, musics });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Admin: Confirm (approve) a music entry
async function confirmMusic(req, res) {
    try {
        const music = await musicModel.findByIdAndUpdate(
            req.params.musicId,
            { status: 'approved' },
            { new: true }
        );
        if (!music) return res.status(404).json({ message: 'Music not found' });
        return res.status(200).json({ message: 'Music confirmed', music });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Admin: Delete any music
async function deleteMusic(req, res) {
    try {
        const music = await musicModel.findByIdAndDelete(req.params.musicId);
        if (!music) return res.status(404).json({ message: 'Music not found' });
        if (music.fileId) await deleteFile(music.fileId);
        return res.status(200).json({ message: 'Music deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createMusic, getMyMusic, updateMusic, deleteMyMusic, getAllMusic, confirmMusic, deleteMusic };