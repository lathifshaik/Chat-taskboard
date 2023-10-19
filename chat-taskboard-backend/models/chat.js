const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Chat', chatSchema);
