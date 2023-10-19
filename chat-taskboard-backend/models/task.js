const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    tasks: [{
        title: String,
        description: String,
        column: String
    }]
});

module.exports = mongoose.model('Task', taskSchema);
