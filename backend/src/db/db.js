const mongoose = require('mongoose');


async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not set');
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
