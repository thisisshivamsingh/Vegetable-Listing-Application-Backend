const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

exports.loginUser = async (req, res) => {
  const { role } = req.body;

  try {
    if (role !== "user" && role !== "admin") {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    if (role == "admin") {
      const user = await User.create({ role });
      const token = generateToken(user._id, user.role);

      res.status(200).json({
        message: "success",
        token,
      });
    }
    if (role == "user") {
      await User.create({ role });

      res.status(200).json({
        message: "success",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const generateToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
