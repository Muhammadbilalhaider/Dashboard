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

exports.getProductById = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const userId = req.user.id;
    const category = req.query.category;

    console.log("UserId in getProductById route:", userId);

    if (!userId) {
      return res.status(400).json({ msg: "User ID not found." });
    }

    const filter = { userId };

    if (category) {
      filter.category = category;
    }

    console.log("Filter:", filter);

    const totalCount = await productModel.countDocuments(filter);
    console.log("Total Count:", totalCount);

    const products = await productModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found for this user." });
    }

    res.json({
      success: true,
      data: products,
      totalPages: totalPages,
      currentPage: page,
      totalCount: totalCount,
      msg: "Products fetched successfully.",
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      success: false,
      msg: "Error fetching product details.",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, resp) => {
  const productId = req.params.id;
  const product = await productModel.findOne(productId);
  if (!product) {
    return resp.status(404).json({ msg: "Product not found." });
  }
  const updateProduct = await productModel.findByIdAndUpdate(
    productId,
    req.body,
    { new: true }
  );

  await resp.json({
    success: true,
    data: updateProduct,
    msg: "Product updated successfully.",
  });
};

exports.deleteProdutct = async (req, resp) => {};
