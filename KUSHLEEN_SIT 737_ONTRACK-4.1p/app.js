// Import necessary libraries
const express = require('express');
const winston = require('winston');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Log to console if not in production environment
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
}

// Define the calculator API endpoints with logging
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`Invalid input for addition - num1: ${num1}, num2: ${num2}`);
        return res.status(400).send({ error: 'Invalid input numbers for addition' });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition - num1: ${num1}, num2: ${num2}, result: ${result}`);
    res.send({ result: result.toString() });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`Invalid input for subtraction - num1: ${num1}, num2: ${num2}`);
        return res.status(400).send({ error: 'Invalid input numbers for subtraction' });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info(`Subtraction - num1: ${num1}, num2: ${num2}, result: ${result}`);
    res.send({ result: result.toString() });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`Invalid input for multiplication - num1: ${num1}, num2: ${num2}`);
        return res.status(400).send({ error: 'Invalid input numbers for multiplication' });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info(`Multiplication - num1: ${num1}, num2: ${num2}, result: ${result}`);
    res.send({ result: result.toString() });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (!isValidNumber(num1) || !isValidNumber(num2) || parseFloat(num2) === 0) {
        logger.error(`Invalid input for division - num1: ${num1}, num2: ${num2}`);
        return res.status(400).send({ error: 'Invalid input numbers for division' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info(`Division - num1: ${num1}, num2: ${num2}, result: ${result}`);
    res.send({ result: result.toString() });
});

// Start the server
app.listen(PORT, () => {
    logger.info(`Calculator microservice running on http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
