const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');

const app = express();
app.use(loggingMiddleware);
app.get('/', (req, res) => {
    res.send('Greetings! Soumava');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})