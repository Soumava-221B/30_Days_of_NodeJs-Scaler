const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const port = 5000;

const app = express();
app.use(express.json());

function connectToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/Day-25", {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log(err, "Error connecting to MongoDB!");
    });
}

connectToMongoDB();

async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({name: 1})
    console.log('Index created on field "name"')
  } catch (error) {
    console.error(error, 'Error creating Index')
  }
}

createProductNameIndex();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
