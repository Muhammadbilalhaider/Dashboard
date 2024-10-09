const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // parse the body of request

const port = 5000;

const router = require("./src/api/routes/route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const MongoUrl = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("Server is listening Successfully");
});
app.use("/user", router);

mongoose.connect(MongoUrl, { useNewUrlParser: true });
const cons = mongoose.connection;

cons.on("open", () => {
  console.log("connected...");
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
