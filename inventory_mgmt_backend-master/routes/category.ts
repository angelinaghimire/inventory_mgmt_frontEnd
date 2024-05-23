import express from "express";
import { getConnection } from "../config/db";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, dangerous, liquid } = req.body;
    let isdangerous: any;
    let isliquid: any;
    dangerous === undefined ? (isdangerous = 0) : (isdangerous = 1);
    liquid === undefined ? (isliquid = 0) : (isliquid = 1);
    const conn: any = await getConnection();
    const result = await conn.query(
      "INSERT INTO category(name , dangerous , liquid ) VALUES(?,?,?)",
      [name, isdangerous, isliquid]
    );
    const newCategory = { id: result[0].insertId, name, isdangerous, isliquid };
    console.log(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const conn: any = await getConnection();
    const result = await conn.query("SELECT * FROM category");
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const conn: any = await getConnection();
    const result = await conn.query("SELECT * FROM category WHERE name = ?", [
      name,
    ]);
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
