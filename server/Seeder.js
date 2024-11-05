const mongoose = require("mongoose");

const dotenv = require("dotenv");

const User = require("./src/api/models/UserModel");
const product = require("./src/api/models/ProductModel");

const products = require("./Products")

const Config = require("./src/api/Config/Config");

dotenv.config();


mongoose.connect(Config.MONGO_URL, { useNewUrlParser: true });


const importData = async () => {
  const sampleData = products.map((product) => {
    return { ...product };
  });

  await product.insertMany(sampleData);
  console.log("Data Imported");
  process.exit();
};

const dataDestroy = async () => {
  await product.deleteMany(sampleData);
  await User.deleteMany();
  process.exit();
};

if (process.argv[2] === "-id") {
  dataDestroy();
} else {
  importData();
}
