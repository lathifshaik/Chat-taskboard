const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Get all tasks for a room
router.get('/:roomName', async (req, res) => {
    try {
        const { roomName } = req.params;
        const tasks = await Task.findOne({ roomName });
        if (!tasks) {
            return res.status(404).send({ error: "Tasks for this room not found" });
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add a new task to a room
router.post('/:roomName', async (req, res) => {
    try {
        const { roomName } = req.params;
        const { title, description, column } = req.body;

        let taskboard = await Task.findOne({ roomName });
        if (!taskboard) {
            taskboard = new Task({ roomName, tasks: [] });
        }

        taskboard.tasks.push({ title, description, column });
        await taskboard.save();

        res.status(201).send({ message: "Task added!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
