const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const fs = require("fs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.handleGetProfile = async (req, res) => {
  try {
    const { userId, role } = req;
    console.log(role);
    console.log(userId);
    const existingUser = await User.findOne({ userId }).select("-password");
    res.status(200).send({
      data: existingUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.handleGetAllUsers = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.handleUpdateProfile = async (req, res) => {
  try {
    const { firstName, lastName, nationalCode } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (nationalCode) {
      user.nationalCode = nationalCode;
    }

    await user.save();
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.handleUpdatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;
    if (!currentPassword) {
      return res.status(400).send({ message: "current pass is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    const user = await User.findOne({ userId });

    const validPassword = await verifyPassword(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.handleUpdatePhone = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const existingPhone = await User.findOne({ mobileNumber });
    if (existingPhone) {
      return res
        .status(400)
        .send({ message: "This mobile number has been register already" });
    }
    if (otp !== "1111") {
      return res.status(404).send({ message: "Wrong otp" });
    }

    user.mobileNumber = mobileNumber;
    await user.save();

    res.status(200).send({ message: "Mobile number updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    // Find the user by ID from the token
    const userId = req.userId;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save the avatar file path to the user model
    user.avatar = req.file.path;

    // Save the updated user with the new avatar
    await user.save();

    res.json({ message: "Avatar uploaded and changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    // Find the user by ID from the token
    const userId = req.userId;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has an avatar
    if (!user.avatar) {
      return res.status(400).json({ message: "User does not have an avatar" });
    }

    // Delete the avatar file from the uploads folder
    fs.unlinkSync(user.avatar);

    // Remove the avatar field from the user model
    user.avatar = undefined;

    // Save the updated user without the avatar
    await user.save();

    res.json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
