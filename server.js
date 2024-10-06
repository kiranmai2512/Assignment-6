const express = require('express');
const app = express();
// server.js
const expressapp = require('./app'); // Import the Express app
const PORT = process.env.PORT || 5000;

// Start the server
expressapp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


