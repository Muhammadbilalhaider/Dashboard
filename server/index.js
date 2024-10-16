const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
require("./src/api/controllers/userRoute"); // This initializes the passport strategy

const port = 5000;
const router = require("./src/api/routes/route");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const MongoUrl = process.env.MONGO_URL;

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Server is listening Successfully");
});

app.use("/user", router);

mongoose.connect(MongoUrl, { useNewUrlParser: true });
const cons = mongoose.connection;

cons.on("open", () => {
  console.log("connected...");
});

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
