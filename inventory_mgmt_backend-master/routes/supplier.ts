import express from "express";
import { getConnection } from "../config/db";

const router = express.Router();

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const conn: any = await getConnection();
    const [rows, fields] = await conn.execute("SELECT * FROM supplier");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const conn: any = await getConnection();
    const result = await conn.query("SELECT * FROM supplier WHERE name = ?", [
      name,
    ]);
    const idresult = await conn.query("SELECT * FROM supplier WHERE id = ?", [
      name,
    ]);
    if (result[0].length === 0 && idresult[0].length === 0) {
      res.status(404).json({ message: "Supplier not found" });
      return;
    } else if (result[0].length > 0) {
      res.status(200).json(result[0]);
      return;
    }
    res.status(200).json(idresult[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new supplier
router.post("/", async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const conn: any = await getConnection();
    const [result, fields] = await conn.execute(
      "INSERT INTO supplier (name, address, phone, email) VALUES (?, ?, ?, ?)",
      [name, address, phone, email]
    );
    const newSupplier = {
      id: result.insertId,
      name,
      address,
      phone,
      email,
    };
    res.status(201).json(newSupplier);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a supplier
router.put("/:id", async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const conn: any = await getConnection();
    await conn.execute(
      "UPDATE supplier SET name = ?, address = ?, phone = ?, email = ? WHERE id = ?",
      [name, address, phone, email, req.params.id]
    );
    res.status(200).json({ message: "Supplier updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a supplier
router.delete("/:id", async (req, res) => {
  try {
    const conn: any = await getConnection();
    await conn.execute("DELETE FROM supplier WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
