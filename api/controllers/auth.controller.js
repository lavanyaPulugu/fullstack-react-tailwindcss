import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// for signup

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

// for signin

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return next(await errorHandler(400, "All fields are required"));
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(await errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, foundUser.password);
    if (!validPassword) {
      return next(await errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Example: token expires in 1 hour
    );

    const { password: pass, ...rest } = foundUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        // other cookie options like secure, sameSite, etc.
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
