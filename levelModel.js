const mongoose = require('mongoose')

module.exports = mongoose.model('levelModel', new mongoose.Schema({
    userId: String,
    level: Number,
    exp: Number,
}));