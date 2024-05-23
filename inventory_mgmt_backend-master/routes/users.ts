import express from "express";
import { getConnection, endConnection } from "../config/db";
import auth from "../middleware/auth";
import adminauth from "../middleware/adminauth";

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const conn: any = await getConnection();
    // Check if user already exists
    const [rows] = await conn.query("SELECT * FROM users WHERE name=?", [
      username,
    ]);
    if (rows.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const result = await conn.query(
      "INSERT INTO users(name, password, role, active) VALUES(?,?,?,?)",
      [username, password, "user", 0]
    );
    const newUser = {
      id: result.insertId,
      username,
      password,
      role: "user",
      active: 0,
    };
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Users
router.get("/", adminauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const [rows] = await conn.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get User By Id
router.get("/:username", auth, async (req, res) => {
  try {
    const { username } = req.params;
    const conn: any = await getConnection();
    const [rows] = await conn.query("SELECT * FROM users WHERE name=?", [
      username,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update User
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role, active } = req.body;
    const conn: any = await getConnection();
    await conn.query(
      "UPDATE users SET name=?, password=?, role=?, active=? WHERE id=?",
      [username, password, role, active, id]
    );
    const updatedUser = { id, username, password, role, active };
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete User
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const conn: any = await getConnection();
    await conn.query("DELETE FROM users WHERE id=?", [id]);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
