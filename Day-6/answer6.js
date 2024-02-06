const express = require('express');
const app = express();
const port = 3000;
/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
    console.log(`Hello, ${name}!`);
    res.send(`Hello, ${name}!`);
}

app.get('/greet', greetHandler);

app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});