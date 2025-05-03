import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const makeTransfer = asyncHandler(async (req, res) => {
    const { recipientAccountNumber, amount, type, recipientBank } = req.body;

    const sender = await User.findById(req.user._id);
    if (!sender) throw new Error('Sender not found');

    if (sender.balance < amount) {
        res.status(400);
        throw new Error('Insufficient balance');
    }

    let receiver = await User.findOne({ accountNumber: recipientAccountNumber });

    if (type === 'local') {
        if (!receiver) throw new Error('Recipient not found');
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();
    } else if (type === 'international') {
        if (!recipientBank) throw new Error('Recipient bank required');
        sender.balance -= amount;
        await sender.save();
    }

    const transaction = await Transaction.create({
        sender: sender._id,
        receiver: receiver ? receiver._id : null,
        amount,
        type,
        recipientBank: recipientBank || '',
        recipientAccountNumber
    });

    res.status(201).json(transaction);
});

export const getUserTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ sender: req.user._id }).sort('-createdAt');
    res.json(transactions);
});

export const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find()
        .populate('sender', 'name accountNumber')
        .populate('receiver', 'name accountNumber')
        .sort('-createdAt');
    res.json(transactions);
});
