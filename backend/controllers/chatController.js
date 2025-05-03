import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';

export const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, message } = req.body;

    const chat = new Chat({ sender: req.user._id, receiver: receiverId, message });
    const savedChat = await chat.save();

    res.status(201).json(savedChat);
});

export const getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const chats = await Chat.find({
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id },
        ]
    }).sort('createdAt');

    res.json(chats);
});
