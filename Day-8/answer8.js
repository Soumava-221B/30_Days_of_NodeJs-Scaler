const express = require('express');
const app = express();
const port = 5000;

function positiveIntegerHandler(req, res, next) {
    const number = parseInt(req.query.number);
    if(Number.isInteger(number) && number>0) {
        res.status(200).send('Success: the number is a possitive integer')
    } else {
        res.status(400).send('Error: the number is not a possitive integer')
    }
} 

app.get('/positive', positiveIntegerHandler);

app.listen(port, (err) => {
    if(!err) {
        console.log(`Server is up and running on ${port}`)
    }
});