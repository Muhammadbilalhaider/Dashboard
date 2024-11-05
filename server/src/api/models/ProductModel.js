const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const config = require('../Config/Config')

const productSchema = mongoose.Schema({
    category:{
        type:String,
      enum: ["Snickers","Boots","Loofers"]  ,
      required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    color:{
        type:String,
        enum: ["white", "blue", "black"],
        required:true
    },
    size:{
        type:String,
        enum: ["small", "medium", "large"],
        required:true
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;