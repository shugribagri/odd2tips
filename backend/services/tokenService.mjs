import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

const generateToken = (userData) => {
  return jwt.sign(userData, secretKey, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(`Token verification failed: ${error.message}`);
    return null;
  }
};

export { generateToken, verifyToken };
