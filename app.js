// app.js
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');  // Import auth routes
const apiRoutes = require('./routes/api');    // Import API routes

const app = express();

// Middleware for handling JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);  // Register auth-related routes
app.use('/api', apiRoutes);    // Register API-related routes

// Home page route
app.get('/', (req, res) => {
    res.render('index'); // Render the home page
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

// Register page route
app.get('/register', (req, res) => {
    res.render('register'); // Render the register page
});

// Dashboard page route
app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard page
});

// About page route
app.get('/about', (req, res) => {
    res.render('about'); // Render the about page
});

// Error Handling
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// Export the app
module.exports = app;
