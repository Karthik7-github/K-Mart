const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    ProductName:String,
    ProductID:String,
    ProductDesc:String,
    ProductCost:Number,
    ProductType:String,
    ProductPic:String
});

const ProductModel = new mongoose.model("products",ProductSchema);

module.exports = ProductModel;