const productModel = require("../models/ProductModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSimple = require("jwt-simple");

exports.addProduct = async (req, resp) => {
  const { name, category, description, price, color, size } = req.body;
  const image = req.file.buffer.toString("base64");

  const newProduct = new productModel({
    name,
    image,
    category,
    description,
    price,
    color,
    size,
    userId: req.user.id,
  });

  await newProduct.save();

  return resp.json({
    success: true,
    data: newProduct,
    msg: "Product created successfully.",
  });
};

exports.getProduct = async (req, resp) => {
  try {
    const products = await productModel.find();
    if (products.length <= 0) {
      return resp.send("Not Found.");
    }
    resp.json({
      success: true,
      data: products,
      msg: "Product are successfully shown.",
    });
  } catch (error) {
    resp.json({
      success: false,
      msg: "Products created falied.",
      error,
    });
  }
};

exports.getProductById = async (req, resp) => {
  const productId = req.params.id;
  if (!productId) {
    return "Not Found.";
  }

  const products = await productModel.findById({ productId });
  resp.json({
    success: true,
    data: products,
    msg: "Product are successfully shown.",
  });
};

exports.updateProductById = async (req, resp) => {};

exports.deleteProdutct = async (req, resp) => {};
