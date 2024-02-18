const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/Day-17').then(() => {
        console.log('Successfully connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting to MongoDB!')
    })
    }

const userSchema = new mongoose.Schema ({
    username: String,
    email: String
})
const User = mongoose.model('User', userSchema)

async function addUserToDatabase() {
    const user = new User ({
        username: 'Soumava_Das',
        email: 'soumavadas@example.com'
    }) 
    const result = await user.save()
    console.log(result)
}

addUserToDatabase();

connectToMongoDB();

app.listen(port, (err) => {
    if(!err)
        console.log('Server running on port: ', port);
})