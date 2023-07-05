import * as authService from "../services/auth.service.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);

    res.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: [error.message] });
  }
};

export const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);

    const token = await createAccessToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 50 * 1000,
    });
    res.json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: [error.message] });
  }
};

export const logout = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.sendStatus(204);

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.sendStatus(204);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: ["Unauthorized"] });

  try {
    const user = await authService.verifyToken(token);
    res.json(user);
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: [error.message] });
  }
};
