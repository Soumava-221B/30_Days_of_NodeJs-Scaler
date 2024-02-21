const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')
const app = express();
const port = 5000;

function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/Day-20').then(() => {
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

app.get('/average-age', async (req, res) => {
    try {
        await connectToMongoDB();
        const result = await User.aggregate([
            {
                $group: {
                    _id: "averageAge",
                    average: {
                        $avg: "$age",
                    },
                },
            },
        ]);
        const average = result[0]?.average;
        res.send({ average: average});
    } catch(err) {
        console.log("Failed to calculate", err);
        res.status(500).send("Failed");
    }
});

app.listen(port, (err) => {
    if(!err)
        console.log('Server running on port: ', port);
})