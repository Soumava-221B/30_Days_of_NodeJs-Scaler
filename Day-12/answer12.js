const express = require('express');
const rateLimit = require('express-rate-limit');
const port = 5000;

const app = express();

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 4,
    message: `Error: Too Many Requests, try again later`,
    statusCode: 429,
    headers: true,
});

app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello, there!');
})

app.listen(port, () => {
    console.log(`server up and running on port ${port}`);
})