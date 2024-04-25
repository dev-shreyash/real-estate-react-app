import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router =express.Router();

router.post('/register',register)
router.post('/login', login)
router.post('/logout', logout)

// Handle undefined routes
router.use((req, res) => {
    res.status(404).json({ error: 'Not found', message: `Cannot ${req.method} ${req.url}` });
});

export default router