const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/handleToken");
const UserModel = require("../../models/users.model");
const bcrypt = require("bcryptjs");
const isValidEmail = require("../../utils/emailValidator");
const tokenHandler = require("../../utils/handleToken");
const jwt = require("jsonwebtoken");

const register = expressAsyncHandler(async (req, res) => {
  try {
    const { full_name, email, password } = req?.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exist.Please login" });
    }
    // VALIDATE EMAIL
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt();
    const passwordHarsh = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    const newUser = await UserModel.create({
      full_name,
      password: passwordHarsh,
      email,
    });

    delete newUser?.password;

    return res.status(200).json({ userData: newUser, message: "success" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req?.body;

    // VALIDATE EMAIL
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
      return res
        .status(400)
        .json({ message: "User does not exit, please signUp" });
    }
    // COMPARE PASSWORD
    const comparePassword = bcrypt.compareSync(password, userDoc?.password);
    if (comparePassword) {
      const token = tokenHandler.generateToken({ id: userDoc?._id });
      return res.status(200).json({
        userDoc,
        token,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(400).json({ message: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// FORGOT PASSWORD

const forgotPassword = expressAsyncHandler(async (req, res) => {
  try {
    const findUserEmail = await UserModel.findOne({ email: req?.body?.email });
    // console.log({ user: findUserEmail });
    if (!findUserEmail) {
      res.status(400);
      throw new Error("Email cannot be found. Please check your typography.");
    }

    const user = {
      userEmail: findUserEmail?.email,
      token: generateToken(findUserEmail),
    };

    // forgotPasswordEmail(user);

    res.send({
      link: ` ${appData.frontendLink}/reset-password/${user.token}`,
      message:
        "A password reset Link has been sent to the email you provided. Check your email inbox but if you can't find it, check your spam folder",
    });
  } catch (error) {
    throw new Error(
      error?.message || "There is a problem trying to reset your password"
    );
  }
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { password, token } = req.body;
    if (password.split("") < 6) {
      res.status(400);
      throw new Error(
        "Your password is weak. Make sure your password is more than 6."
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ email: decoded?.email }).select(
      "-password"
    );
    user.password = password;
    const saved = await user.save();

    if (!saved) {
      res.status(500);
      throw new Error(
        "Something went wrong. Please start the whole process again."
      );
    }

    res.send({ message: "Your password has been reset successfully." });
  } catch (error) {
    res.status(500);
    throw new Error(
      "It seems that your link has expired. Please start the whole process again and complete it as soon as possible."
    );
  }
});

module.exports = { register, login, forgotPassword, resetPassword };
