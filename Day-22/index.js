const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const app = express();
const port = 5000;

function connectToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/Day-22")
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB!");
    });
}

connectToMongoDB();

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log("Product creaated:", newProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log("All Prodcuts:", products);
    return products;
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    return [];
  }
}

async function updateProduct(productId, updateProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updateProduct, {
      new: true,
    });
    console.log("Product updated:", product);
  } catch (error) {
    console.error("Error updating product:", error.message);
  }
}

async function deleteProduct(productId) {
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    console.log("Product deleted:", deleteProduct);
  } catch (error) {
    console.log("Error deleting product:", error.message);
  }
}

const DairyProduct = { name: "Milk", price: 60, quantity: 1 };

createProduct(DairyProduct)
  .then(() => getAllProducts())
  .then(() => updateProduct("65d8361b7b657f8f4bf1e95b", { price: 12.35 }))
  .then(() => deleteProduct("65d836359925d1343fbc08b6"));

app.listen(port, (err) => {
  if (!err) console.log("Server running on port: ", port);
});
