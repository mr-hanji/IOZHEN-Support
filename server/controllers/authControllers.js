const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constant/index");

const hashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
   return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
   return jwt.sign(
      { userId: user._id, role: user.role },
      constants.secretPhrase,
      { expiresIn: "1h" } // Add an expiry time for the token
   );
};

exports.handleSignUp = async (req, res) => {
   try {
      const { mobileNumber, password, admin } = req.body;

      const existingUser = await User.findOne({ mobileNumber });

      if (existingUser) {
         return res.status(400).send({
            message: "Phone already exists",
         });
      }

      const hashedPassword = await hashPassword(password);
      if (admin === "Iozhen8252@") {
         let newUser = new User({
            mobileNumber,
            password: hashedPassword,
         });
         await newUser.save();
         res.status(200).send({ message: "User created successfully" });
      } else {
         res.status(401).send({ message: "you cant not sign up " });
      }
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
   }
};

exports.handleLogin = async (req, res) => {
   try {
      const { mobileNumber, password } = req.body;
      const user = await User.findOne({ mobileNumber });
      if (!user) {
         return res.status(404).send({ message: "User not found" });
      }
      const validPassword = await verifyPassword(password, user.password);
      if (!validPassword) {
         return res.status(400).send({
            message: "Invalid password",
         });
      }

      const token = generateToken(user);
      res.status(200).send({
         message: "User logged in successfully",
         data: { token },
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
   }
};
