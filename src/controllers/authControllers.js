import User from "../models/user.js";
import { comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }
    if (!email && !phone) {
      return res.status(400).json({ message: "Masukkan email atau nomor HP" });
    }
    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
    }
    if (phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: "Nomor sudah terdaftar" });
      }
    }
    const newUser = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/Nomor HP dan password wajib diisi" });
    }
    const isEmail = identifier.includes("@");
    const user = await User.findOne({
      where: isEmail ? { email: identifier } : { phone: identifier },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({message: "Login berhasil", token});
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message
     });
  }
};
