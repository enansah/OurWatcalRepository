// src/app.js
const express = require('express');
const connectDB = require('./utils/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const roomRoutes = require('./src/routes/roomRoutes');
const dataroute = require('./src/routes/dataroute');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware setup
app.use(bodyParser.json());


// Use the secret key from the environment variable
const sessionSecret = process.env.SESSION_SECRET;

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/Home.html'));
});


// API routes
app.use('/api', require('./src/routes/tenantRoutes'));
app.use('/api', require('./src/routes/landlordRoutes'));
app.use('/api', roomRoutes);
app.use('/api', dataroute);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });

// Export app
module.exports = app;
