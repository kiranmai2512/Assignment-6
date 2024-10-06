// routes/auth.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const userDataFile = path.join(__dirname, '../data/users.json');

// Registration page (GET)
router.get('/register', (req, res) => {
    res.render('register');
});

// Login page (GET)
router.get('/login', (req, res) => {
    res.render('login');
});

// Register user (POST)
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    fs.readFile(userDataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data.' });

        const users = JSON.parse(data || '[]');

        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        users.push({ username, password });

        fs.writeFile(userDataFile, JSON.stringify(users, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error saving user data.' });
            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

// Authenticate user during login (POST)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    fs.readFile(userDataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data.' });

        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.json({ message: 'Login successful.', user: { username, email: "user@example.com" } });
    });
});

module.exports = router;
