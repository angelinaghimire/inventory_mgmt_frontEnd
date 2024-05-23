import express from "express";
import { getConnection } from "../config/db";
import { generateAccessToken } from "../config/jwt";

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const conn: any = await getConnection();
    console.log("Connected to DB");

    const [result] = await conn.query("SELECT * FROM users WHERE name=?", [
      username,
    ]);
    if (result.length === 0) {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    } else if (result[0].password === password) {
      const accessToken = generateAccessToken(result[0]);
      console.log("Login success");
      res.status(200).json({
        message: "Login success",
        accessToken,
        id: result[0].id,
      });
    } else {
      console.log("Wrong password");
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
