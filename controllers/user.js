import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ error: "Username does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.json({ error: "Wrong password." });

    const token = jwt.sign(
      { username: user.username, id: user._id },
      "OmBudiProject"
    );

    const result = {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
    };
    res.json({ result, token });
  } catch (error) {
    console.log(error.message);
    res.send({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { fullname, username, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.json({ error: "Username already exist." });

    if (password !== confirmPassword)
      return res.json({ error: "Password confirmation does not match." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      fullname,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      "OmBudiProject"
    );

    const result = {
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
    };

    res.json({ result, token });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};
