const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = require('./Route/route');
require('dotenv').config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors())
const MongoUrl = process.env.MONGO_URL;

app.use('/user', router)
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("SECRET_KEY:", process.env.SECRET_KEY);

mongoose.connect(MongoUrl).then(() => {
  console.log("Connected")
  app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
  })
}).catch((error) => {
  console.log(`Error is ${error}`)
})
