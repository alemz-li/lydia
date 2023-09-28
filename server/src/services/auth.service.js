import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const register = async (data) => {
  const { username, email, password } = data;

  const isRegistered = await User.findOne({ $or: [{ username }, { email }] });

  if (isRegistered) throw { code: 400, message: "User already registered" };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: passwordHash,
  });

  return await user.save();
};

export const login = async ({ email, password }) => {
  const userFound = await User.findOne({ email });
  if (!userFound) throw { code: 400, message: ["Invalid credentials"] };

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) throw { code: 400, message: ["Incorrect password"] };

  return userFound;
};

export const verifyToken = async (token) => {
  return jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) throw { code: 401, message: "Unauthorized" };

    const userFound = await User.findById(decoded.id);
    if (!userFound) throw { code: 401, message: "Unauthorized" };

    return {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
  });
};
