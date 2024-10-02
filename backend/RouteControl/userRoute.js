const userModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SECRET_N = process.env.SECRET_KEY; // Ensure this matches exactly with your .env file



const SignUp = async (req, resp) => {
  const { FirstName, LastName, DateOfBirth, Gender, email, password } = req.body;
  const existUser = await userModel.findOne({ email: email });
  if (existUser) {
    await resp.status(400).json({ message: "Already Registered" })
  } else {
    const hashPass = await bcrypt.hash(password, 10);
    const result = await userModel.create({

      FirstName,
      LastName,
      DateOfBirth: {
        day: DateOfBirth.day,
        month: DateOfBirth.month,
        year: DateOfBirth.year
      },
      Gender,
      email,
      password: hashPass
    })

    const token = jwt.sign({ FirstName: result.FirstName, LastName: result.LastName, email: email }, SECRET_N);

    await resp.status(200).json({ User: result, token });

  }
}
const SignIn = async (req, resp) => {
  const { email, password } = req.body;
  const currentUser = await userModel.findOne({ email: email });
  if (!currentUser) {
    await resp.status(400).json({ message: "Not Register Please Register First" })
  } else {
    const confirmPass = bcrypt.compare(password, currentUser.password);
    if (!confirmPass) {
      await resp.status(400).json({ message: 'Password Not Matched' })
    } else {
      const token = jwt.sign({ FirstName: currentUser.FirstName, LastName: currentUser.LastName, email: email }, SECRET_N);
      const result = await resp.status(200).json({ User: currentUser, token });
      if (result) {
        console.log("Success")
      } else {
        console.log("Not success")
      }
    }
  }
}

module.exports = { SignUp, SignIn }

