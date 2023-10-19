const express = require('express');
const Chat = require('../models/chat');

const router = express.Router();

// Get all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.send(chats);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Post a new message to a chat room
router.post('/:roomName/message', async (req, res) => {
    try {
        const { roomName } = req.params;
        const { userId, content } = req.body;

        const chat = await Chat.findOne({ roomName });
        if (!chat) {
            return res.status(404).send({ error: "Chat room not found" });
        }

        chat.messages.push({ user: userId, content });
        await chat.save();

        res.status(201).send({ message: "Message added!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
