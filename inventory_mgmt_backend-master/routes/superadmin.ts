import express from "express";
import { getConnection } from "../config/db";
import superauth from "../middleware/superauth";

const router = express.Router();

// change a user to admin or superadmin based on url  parameter
router.put("/admin/:id", superauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const { id } = req.params;
    const result = await conn.query(
      "UPDATE user SET role = 'admin' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// change a user to admin or superadmin based on url  parameter
router.put("/superadmin/:id", superauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const { id } = req.params;
    const result = await conn.query(
      "UPDATE user SET role = 'superadmin' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user based on url parameter
router.delete("/user/:id", superauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const { id } = req.params;
    const result = await conn.query("DELETE FROM user WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category based on url parameter
router.delete("/category/:id", superauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const { id } = req.params;
    const result = await conn.query("DELETE FROM category WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// demote a user to normal user based on url parameter
router.put("/user/:id", superauth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const { id } = req.params;
    // cheack if there are other superadmins, if not, dont demote
    const superadmins = await conn.query(
      "SELECT * FROM user WHERE role = 'superadmin'"
    );
    if (superadmins.length === 1) {
      res
        .status(400)
        .json({
          message:
            "Cannot demote, only one superadmin. promote other user first.",
        });
    }
    const result = await conn.query(
      "UPDATE user SET role = 'user' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
