const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const logger = require('./utils/logger');
const db = require('./models');

// Handle Global Errors
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at: %o, reason: %o', promise, reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception: %o', error);
    process.exit(1);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Request Logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/auth/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic Error Handler
app.use((err, req, res, next) => {
    logger.error('Unhandled Error: %o', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const server = app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${config.port} is already in use. Please kill the process or use a different port.`);
    } else {
        logger.error('Error starting server: %o', error);
    }
    process.exit(1);
});
