const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/product");
const port = 5000;

const app = express();
app.use(express.json());

function connectToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/Day-24")
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log(err, "Error connecting to MongoDB!");
    });
}

connectToMongoDB();

app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
