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

// Exponentiation Endpoint
app.get('/power', (req, res) => {
    const { base, exponent } = req.query;
    if (!isValidNumber(base) || !isValidNumber(exponent)) {
        logger.error(`Invalid input for power - base: ${base}, exponent: ${exponent}`);
        return res.status(400).send({ error: 'Invalid input numbers for power operation' });
    }
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    logger.info(`Exponentiation - base: ${base}, exponent: ${exponent}, result: ${result}`);
    res.send({ result: result.toString() });
});

// Square Root Endpoint
app.get('/sqrt', (req, res) => {
    const { number } = req.query;
    if (!isValidNumber(number) || parseFloat(number) < 0) {
        logger.error(`Invalid input for square root - number: ${number}`);
        return res.status(400).send({ error: 'Invalid input number for square root operation' });
    }
    const result = Math.sqrt(parseFloat(number));
    logger.info(`Square root - number: ${number}, result: ${result}`);
    res.send({ result: result.toString() });
});

// Modulo Endpoint
app.get('/mod', (req, res) => {
    const { dividend, divisor } = req.query;
    if (!isValidNumber(dividend) || !isValidNumber(divisor) || parseFloat(divisor) === 0) {
        logger.error(`Invalid input for modulo - dividend: ${dividend}, divisor: ${divisor}`);
        return res.status(400).send({ error: 'Invalid input numbers for modulo operation' });
    }
    const result = parseFloat(dividend) % parseFloat(divisor);
    logger.info(`Modulo - dividend: ${dividend}, divisor: ${divisor}, result: ${result}`);
    res.send({ result: result.toString() });
});
