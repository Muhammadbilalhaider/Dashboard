const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { MONGO_URL } = require('./src/api/Config/Config')


const port = 5000;
const router = require("./src/api/routes/route");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());



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

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
const cons = mongoose.connection;

cons.on("open", () => {
  console.log("connected...");
});

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
