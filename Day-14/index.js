const express = require('express');
const app = express();
const cache = {};
const port = 5000;
const cacheTTL = 60 * 1000;
function cachingMiddleware(req, res, next) {
    const url = req.url;
    if (cache[url] && cache[url].timestamp > Date.now() - cacheTTL) {
        console.log('Returning cached response for: ', url);
        return res.send(cache[url].data);
    }
    next();
}
function cacheResponse(req, res, data) {
    const url = req.url;
    cache[url] = {
        data: data,
        timestamp: Date.now()
    };
    res.send(data);
}
app.use(cachingMiddleware);
app.get('/', (req, res) => {
    cacheResponse(req, res, 'Hello! Everyone');
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})