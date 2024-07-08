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
      { userId: user.userId, role: user.role },
      constants.secretPhrase
   );
};

exports.verifyMobileNumber = async (req, res) => {
   try {
      const { mobileNumber } = req.body;

      const existingUser = await User.findOne({ mobileNumber });
      if (existingUser) {
         return res.status(400).send({ message: "Phone already exist" });
      }
      res.status(200).send({ message: "OTP sent" });
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
   }
};

exports.verifyOTP = async (req, res) => {
   try {
      const { mobileNumber, otp } = req.body;

      const existingUser = await User.findOne({ mobileNumber });
      if (existingUser) {
         return res.status(400).send({ message: "Phone already exist" });
      }

      if (otp !== "1111") {
         return res.status(404).send({ message: "Wrong OTP" });
      }
      res.status(200).send({ message: "OTP is correct" });
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
   }
};

exports.handleSignUp = async (req, res) => {
   try {
      const { mobileNumber, password, otp, admin } = req.body;

      const existingUser = await User.findOne({ mobileNumber });

      if (existingUser) {
         return res.status(400).send({
            message: "Phone already exists",
         });
      }

      if (otp !== "1111") {
         return res.status(404).send({
            message: "Wrong OTP",
         });
      }

      const hashedPassword = await hashPassword(password);
      let newUser = null;

      if (admin && admin === "123456") {
         newUser = new User({
            mobileNumber,
            password: hashedPassword,
            role: "admin",
         });
      } else {
         newUser = new User({
            mobileNumber,
            password: hashedPassword,
         });
      }

      await newUser.save();
      res.status(200).send({ message: "User created successfully" });
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
         message: "User logged In successfully",
         data: { token },
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
   }
};
