//@ts-nocheck
import { generateAccessToken, verifyAccessToken } from "../config/jwt";

const auth = (req, res, next) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  const userID = req.header("UserID");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = verifyAccessToken(token, userID);
    if (decoded === false) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Error while Validating" });
  }
};

export default auth;
