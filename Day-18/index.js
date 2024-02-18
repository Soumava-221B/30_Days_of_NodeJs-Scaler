const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')
const app = express();
const port = 5000;

function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/Day-18').then(() => {
        console.log('Successfully connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting to MongoDB!')
    })
    }

connectToMongoDB();

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

app.get('/', (req, res) => {
    res.send('Hello! there');
})

app.get('/users', getAllUsers);

app.listen(port, (err) => {
    if(!err)
        console.log('Server running on port: ', port);
})