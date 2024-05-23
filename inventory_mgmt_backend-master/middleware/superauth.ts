//@ts-nocheck
import { generateAccessToken, verifyAccessToken } from "../config/jwt";
import { getConnection } from "../config/db";

const auth = async (req, res, next) => {
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

    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM users WHERE id=?", [
      userID,
    ]);
    if (result.length === 0) {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    } else if (result[0].role === "superadmin") {
      console.log("admin acess granted");
      next();
    } else {
      console.log("admin acess denied");
      res.status(401).json({ message: "admin acess denied" });
    }
  } catch (error) {
    res.status(401).json({ message: "Error while Validating" });
  }
};

export default auth;
