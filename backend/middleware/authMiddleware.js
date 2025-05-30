import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect customer or admin
export const protect = asyncHandler(async (req, res, next) => {
   const token = req.cookies.token;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized');
    }
    next();
});

// Only admin
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Admin access required');
    }
};
