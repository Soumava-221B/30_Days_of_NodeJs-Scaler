const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/product");
const app = express();
const port = 5000;

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = mongoose.model("Category", categorySchema);
const ProductWithCategory = mongoose.model(
  "ProductWithCategory",
  productSchema
);


async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find()
      .populate("category")
      .exec();
  } catch (error) {
    console.error("Error fectching products with populated category:", error);
    throw error;
  }
}

async function test() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Day-23")
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => console.error("MongoDB connection error:", err));

    const category1 = await Category.create({
      name: "Smartphone",
      descryption: "Smartphone accessories",
    });
    
    const category2 = await Category.create({
      name: "Food",
      description: "Fast Food items",
    });
    
    const category3 = await Category.create({
      name: "Cars",
      description: "Hypercars",
    });
    
    await ProductWithCategory.create({
      name: "Iphone",
      price: 200,
      category: category1._id,
    });
    
    await ProductWithCategory.create({
      name: "Momos",
      price: 40,
      category: category2._id,
    });
    
    await ProductWithCategory.create({
      name: "Mercedez-Benz S class",
      price: 100,
      category: category3._id,
    });
  } catch(error) {
    console.log(error);
  }
}

test();

app.listen(port, (err) => {
  if (!err) console.log("Server running on port: ", port);
});
