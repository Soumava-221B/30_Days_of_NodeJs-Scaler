const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));    // to use static page
const customMiddleware = (req, res) => {
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile(__dirname+"/index.html")
    })

    app.get('/styles/styles.css', (req, res) => {
        res.sendFile(__dirname+"/styles/style.css")
    })
}

app.listen(port, (err) => {
    if(!err) {
        console.log(`Server is up and running on ${port}`)
    }
});