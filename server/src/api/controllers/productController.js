const productModel = require("../models/ProductModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSimple = require("jwt-simple");



const GetProducts = async (req, resp) => {
  try {
 
    const { category } = req.query;

   
    const query = category ? { category } : {};
    
  
    const products = await productModel.find(query);

    if (products.length === 0) {
      return resp.status(404).json({
        success: false,
        msg: "No products found for the specified category",
      });
    }

    resp.json({
      success: true,
      data: products,
      msg: "Products shown successfully",
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    resp.status(500).json({
      success: false,
      msg: "Failed to fetch products",
      error: error.message,
    });
  }
};

module.exports = { GetProducts };

const AddProducts = async (req, resp) => {

}
const UpdateProduct = async (req, resp) => {
}

const DeleteProducts = async (req, resp) => {
}

module.exports = { AddProducts, UpdateProduct, DeleteProducts, GetProducts }
