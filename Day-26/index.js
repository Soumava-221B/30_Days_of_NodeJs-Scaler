const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const port = 5000;

const app = express();
app.use(express.json());

function connectToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/Day-26" )
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log(err, "Error connecting to MongoDB!");
    });
}

connectToMongoDB();

async function getProductStatistics() {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    totalProducts: { $avg: '$price' },
                    highestQuantity: { $max: '$quantity' }
                }
            }
        ]);
        return stats;
    }
    catch(error) {
        console.log(error, "Error getting product statistics");
    }
}

try{
    getProductStatistics().then((stats) => {
        console.log(stats);
    });
} catch(err) {
    console.log(err);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});