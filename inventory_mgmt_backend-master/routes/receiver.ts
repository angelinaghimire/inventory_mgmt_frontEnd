import express from "express";
import { getConnection } from "../config/db";

const receiverRouter = express.Router();

// GET request to retrieve all receivers
receiverRouter.get("/", async (req, res) => {
  try {
    const conn: any = await getConnection();
    const [rows] = await conn.query("SELECT * FROM receiver");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

receiverRouter.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const conn: any = await getConnection();
    const result = await conn.query("SELECT * FROM receiver WHERE name = ?", [
      name,
    ]);
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST request to add a new receiver
receiverRouter.post("/", async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const conn: any = await getConnection();
    const [result] = await conn.query(
      "INSERT INTO receiver (name, address, phone, email) VALUES (?, ?, ?, ?)",
      [name, address, phone, email]
    );
    const newReceiver = {
      id: result.insertId,
      name,
      address,
      phone,
      email,
    };
    res.json(newReceiver);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// PUT request to update a receiver by id
receiverRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, address, phone, email } = req.body;
  try {
    const conn: any = await getConnection();
    const [result] = await conn.query(
      "UPDATE receiver SET name=?, address=?, phone=?, email=? WHERE id=?",
      [name, address, phone, email, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).send("Receiver not found");
    } else {
      const updatedReceiver = {
        id,
        name,
        address,
        phone,
        email,
      };
      res.json(updatedReceiver);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// DELETE request to delete a receiver by id
receiverRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const conn: any = await getConnection();
    const [result] = await conn.query("DELETE FROM receiver WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).send("Receiver not found");
    } else {
      res.send("Receiver deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default receiverRouter;
